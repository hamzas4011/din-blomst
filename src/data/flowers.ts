import flower2 from "../assets/flower-2.jpg";
import flower4 from "../assets/flower-4.jpg";
import flower5 from "../assets/flower-5.jpg";
import flower6 from "../assets/flower-6.jpg";
import flower7 from "../assets/flower-7.jpg";
import flower8 from "../assets/flower-8.jpg";
import flower9 from "../assets/flower-9.jpg";
import flower10 from "../assets/flower-10.jpg";
import flower11 from "../assets/flower-11.jpg";
import flower12 from "../assets/flower-12.jpg";
import flower13 from "../assets/flower-13.jpg";
import flower14 from "../assets/flower-14.jpg";
import { catalog, type CatalogItem } from "./catalog";

export type Flower = CatalogItem & { image: string };

// Bildet kobles på navn, så rekkefølgen i catalog.ts ikke spiller noen rolle.
const images: Record<string, string> = {
  "Rosa Roser": flower2,
  "Hvite Tulipaner": flower6,
  "Peoner": flower7,
  "Solsikker": flower9,
  "Vårbukett": flower5,
  "Sommerbukett": flower14,
  "Rustikk Bukett": flower10,
  "Hvit Elegance": flower4,
  "Bryllupsbukett": flower13,
  "Orkidé": flower11,
  "Grønne planter": flower12,
  "Fødselsdagsbukett": flower8,
};

export const flowers: Flower[] = catalog.map((item) => ({ ...item, image: images[item.name] }));
