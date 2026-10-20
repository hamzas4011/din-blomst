// Ren data uten bilder, så den kan brukes både i nettleseren og i api/recommend.ts.
export type CatalogItem = {
  name: string;
  price: string;
  tags: string[];
  description: string;
};

export const catalog: CatalogItem[] = [
  { name: "Rosa Roser", price: "249 kr", tags: ["kjærlighet", "morsdag", "bursdag", "rosa", "rød"], description: "Klassiske roser – selve symbolet på kjærlighet." },
  { name: "Hvite Tulipaner", price: "199 kr", tags: ["vår", "takk", "sorg", "bedring", "hvit"], description: "Enkle og elegante tulipaner som passer til det meste." },
  { name: "Peoner", price: "329 kr", tags: ["kjærlighet", "morsdag", "bryllup", "rosa"], description: "Frodige peoner – romantiske og litt ekstra spesielle." },
  { name: "Solsikker", price: "179 kr", tags: ["bedring", "bursdag", "takk", "sommer", "gul"], description: "Solsikker som sprer glede og sommerfølelse." },
  { name: "Vårbukett", price: "279 kr", tags: ["vår", "bursdag", "morsdag", "takk"], description: "Lys og frisk bukett fylt med vårens farger." },
  { name: "Sommerbukett", price: "299 kr", tags: ["sommer", "bursdag", "takk", "bedring"], description: "Fargerik bukett som bringer sommeren inn." },
  { name: "Rustikk Bukett", price: "259 kr", tags: ["hjem", "takk", "bursdag"], description: "Naturlig og rustikk bukett med et sjarmerende uttrykk." },
  { name: "Hvit Elegance", price: "349 kr", tags: ["bryllup", "sorg", "kjærlighet", "hvit"], description: "Stilrene hvite blomster for de store anledningene." },
  { name: "Bryllupsbukett", price: "499 kr", tags: ["bryllup", "hvit"], description: "Laget for den store dagen." },
  { name: "Orkidé", price: "229 kr", tags: ["hjem", "takk", "bedring"], description: "Langvarig potteplante – en gave som varer." },
  { name: "Sukkulent-sett", price: "199 kr", tags: ["hjem"], description: "Lettstelte sukkulenter, perfekt til hjem og kontor." },
  { name: "Fødselsdagsbukett", price: "289 kr", tags: ["bursdag"], description: "Festlig bukett laget for å feire." },
];
