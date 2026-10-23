import Anthropic from "@anthropic-ai/sdk";
import { catalog } from "../src/data/catalog.js";

// Kjører på Vercel som en serverless-funksjon. Nøkkelen leses fra ANTHROPIC_API_KEY
// og når aldri nettleseren.
const client = new Anthropic();

const system = `Du er blomsterassistenten i nettbutikken Din Blomst.
Foreslå opptil tre produkter fra sortimentet som passer til det kunden skriver.
Respekter budsjettet hvis kunden nevner et. Skriv en svært kort, vennlig begrunnelse på norsk for hvert forslag: maks 10 ord, uten å gjenta prisen.
Hvis ingenting passer, returner en tom liste.

Sortiment:
${catalog.map((item) => `- ${item.name} (${item.price}): ${item.description} Passer til: ${item.tags.join(", ")}`).join("\n")}`;

const schema = {
    type: "object",
    properties: {
        recommendations: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string", enum: catalog.map((item) => item.name) },
                    reason: { type: "string" },
                },
                required: ["name", "reason"],
                additionalProperties: false,
            },
        },
    },
    required: ["recommendations"],
    additionalProperties: false,
};

export async function POST(request: Request) {
    const body = await request.json().catch(() => null);
    const query = typeof body?.query === "string" ? body.query.trim().slice(0, 200) : "";
    if (!query) {
        return Response.json({ error: "Mangler query" }, { status: 400 });
    }

    try {
        const response = await client.beta.messages.create({
            model: "claude-sonnet-5-5",
            max_tokens: 2000,
            betas: ["server-side-fallback-2026-07-01"],
            fallbacks: "default",
            output_config: { effort: "low", format: { type: "json_schema", schema } },
            system,
            messages: [{ role: "user", content: query }],
        });

        if (response.stop_reason === "refusal") {
            return Response.json({ recommendations: [] });
        }

        const text = response.content.find((block) => block.type === "text")?.text ?? "";
        const { recommendations } = JSON.parse(text);
        return Response.json({ recommendations: recommendations.slice(0, 3) });
    } catch (error) {
        console.error(error);
        return Response.json({ error: "AI-tjenesten svarte ikke" }, { status: 502 });
    }
}
