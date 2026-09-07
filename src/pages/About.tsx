import shop from "../assets/shop.jpg";

export default function About() {
    return (
        <div className="px-8 pt-32 pb-16 max-w-5xl mx-auto">
            <h1 className="font-heading text-5xl text-charcoal text-center mb-12">
                Om oss
            </h1>

            <section className="flex flex-col md:flex-row items-center gap-10">
                <img
                    src={shop}
                    alt="Din Blomst butikk"
                    loading="lazy"
                    className="w-full md:w-1/2 object-cover rounded-lg shadow-md"
                />
                <div className="md:w-1/2">
                    <p className="font-body text-charcoal leading-relaxed mb-4">
                        Din Blomst har vært en familiebedrift siden 1972.
                        Det som startet som en liten blomsterbod drevet med kjærlighet gjennom generasjoner,
                        har vokst til en butikk vi er stolte av i dag. 
                        Fortsatt velges hver stilk med samme omtanke som den gang.
                    </p>
                    <p className="font-body text-charcoal leading-relaxed">
                        Hver bukett settes sammen for hånd med friske sesongblomster og god tid. 
                        Vi tror ikke på hastverk når det kommer til blomster som skal bety noe.
                        Enten det er en bukett til deg selv en helt vanlig tirsdag,
                        eller en gave til noen som betyr mye, ønsker vi at hver blomst skal fortelle en historie.
                    </p>
                </div>
            </section>
        </div>
    )
}