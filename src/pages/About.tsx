import shop from "../assets/shop.jpg";

export default function About() {
    return (
        <div className="px-8 py-16 max-w-5xl mx-auto">
            <h1 className="font-heading text-4xl text-charcoal text-center mb-12">
                Om oss
            </h1>

            <section className="flex flex-col md:flex-row items-center gap-10">
                <img
                    src={shop}
                    alt="Din Blomst butikk"
                    className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
                />
                <div className="md:w-1/2">
                    <p className="font-body text-charcoal leading-relaxed mb-4">
                        Din Blomst startet med en enkel idé: at blomster skal bringe glede inn i hverdagen,
                        ikke bare på store anledninger. Det som begynte som en liten samling håndplukkede
                        buketter, har vokst til en butikk der hver stilk velges med omtanke.
                    </p>
                    <p className="font-body text-charcoal leading-relaxed">
                        Vi tror på det enkle og vakre — friske, sesongbaserte blomster, satt sammen med
                        kjærlighet til detaljer. Enten det er en bukett til deg selv en helt vanlig tirsdag,
                        eller en gave til noen som betyr mye, ønsker vi at hver blomst skal fortelle en historie.
                    </p>
                </div>
            </section>
        </div>
    )
}