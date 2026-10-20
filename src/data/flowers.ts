import flower1 from "../assets/flower-1.jpg";
import flower2 from "../assets/flower-2.jpg";
import flower3 from "../assets/flower-3.jpg";
import flower4 from "../assets/flower-4.jpg";
import flower5 from "../assets/flower-5.jpg";
import flower6 from "../assets/flower-6.jpg";
import flower7 from "../assets/flower-7.jpg";
import flower8 from "../assets/flower-8.jpg";
import flower9 from "../assets/flower-9.jpg";
import flower10 from "../assets/flower-10.jpg";
import flower11 from "../assets/flower-11.jpg";
import flower12 from "../assets/flower-12.jpg";
import { catalog, type CatalogItem } from "./catalog";

export type Flower = CatalogItem & { image: string };

// Bildene ligger i samme rekkefølge som produktene i catalog.ts.
const images = [flower1, flower2, flower3, flower4, flower5, flower6, flower7, flower8, flower9, flower10, flower11, flower12];

export const flowers: Flower[] = catalog.map((item, index) => ({ ...item, image: images[index] }));
