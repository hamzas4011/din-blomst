import { flowers, type Flower } from "../data/flowers";

export type Recommendation = {
    flower: Flower;
    reason: string;
};

// Ord i brukerens melding som peker på en tag i flowers.ts.
const keywords: Record<string, string[]> = {
    kjærlighet: ["valentin", "kjæreste", "kjærlighet", "romantisk", "love", "romantic", "date", "jubileum", "anniversary", "girlfriend", "kone", "wife"],
    bursdag: ["bursdag", "fødselsdag", "birthday", "gratulerer", "feire", "celebrate"],
    bryllup: ["bryllup", "wedding", "brud", "bride", "forlovelse", "engagement"],
    takk: ["takk", "takke", "takknemlig", "thank", "vertinne", "host"],
    bedring: ["bedring", "syk", "sykehus", "get well", "sick", "hospital", "oppmuntring"],
    sorg: ["begravelse", "kondolanse", "sorg", "minnestund", "funeral", "sympathy"],
    morsdag: ["mor", "mamma", "morsdag", "mother", "mom", "mum"],
    hjem: ["hjem", "hjemmet", "innflytting", "housewarming", "kontor", "office", "home", "potteplante", "plante", "plant", "varer lenge"],
    vår: ["våren", "vårlig", "påske", "spring", "easter"],
    sommer: ["sommer", "summer"],
    rosa: ["rosa", "pink"],
    rød: ["rød", "røde", "red"],
    hvit: ["hvit", "hvite", "white"],
    gul: ["gul", "gule", "yellow"],
};

const priceToNumber = (price: string) => parseInt(price.replace(/\D/g, ""), 10) || 0;

// Korte ord må matche eksakt ("mor" skal ikke treffe "morsom"), lengre ord kan ha endelser.
function matchesKeyword(words: string[], text: string, keyword: string) {
    if (keyword.includes(" ")) return text.includes(keyword);
    return words.some((word) => word === keyword || (keyword.length >= 5 && word.startsWith(keyword)));
}

function findBudget(text: string) {
    const numbers = text.match(/\d+/g)?.map(Number).filter((n) => n >= 100) ?? [];
    return numbers.length > 0 ? Math.max(...numbers) : null;
}

/**
 * Finner opptil tre blomster som passer til det brukeren skriver.
 *
 * Bruker AI-en i api/recommend.ts, med nøkkelord-matching mot tags som reserve.
 */
export async function getRecommendations(query: string): Promise<Recommendation[]> {
    // Spør AI-en via /api/recommend. Feiler den (f.eks. i `npm run dev` uten API), brukes nøkkelordene.
    try {
        const response = await fetch("/api/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ query }),
        });
        if (response.ok) {
            const data: { recommendations: { name: string; reason: string }[] } = await response.json();
            return data.recommendations.flatMap(({ name, reason }) => {
                const flower = flowers.find((item) => item.name === name);
                return flower ? [{ flower, reason }] : [];
            });
        }
        console.warn(`AI-assistenten svarte ikke (HTTP ${response.status}). Bruker nøkkelord-søk i stedet.`);
    } catch (error) {
        console.warn("AI-assistenten var ikke tilgjengelig. Bruker nøkkelord-søk i stedet.", error);
    }
    return getLocalRecommendations(query);
}

function getLocalRecommendations(query: string): Recommendation[] {
    const text = query.toLowerCase();
    const words = text.split(/[^\p{L}\d]+/u).filter(Boolean);
    const budget = findBudget(text);
    const wantedTags = Object.keys(keywords).filter((tag) =>
        keywords[tag].some((keyword) => matchesKeyword(words, text, keyword))
    );

    // 10 % slingringsmonn, så "rundt 300 kr" også tar med en bukett til 329 kr.
    const withinBudget = flowers.filter(
        (flower) => budget === null || priceToNumber(flower.price) <= budget * 1.1
    );

    let matches: Flower[] = [];
    if (wantedTags.length > 0) {
        matches = withinBudget
            .map((flower) => ({ flower, score: flower.tags.filter((tag) => wantedTags.includes(tag)).length }))
            .filter(({ score }) => score > 0)
            .sort((a, b) => b.score - a.score || priceToNumber(a.flower.price) - priceToNumber(b.flower.price))
            .map(({ flower }) => flower);
    } else if (budget !== null) {
        matches = [...withinBudget].sort((a, b) => priceToNumber(b.price) - priceToNumber(a.price));
    }

    return matches.slice(0, 3).map((flower) => ({ flower, reason: flower.description }));
}
