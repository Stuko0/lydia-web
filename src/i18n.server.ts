import es from "../public/locales/es/common.json";
import en from "../public/locales/en/common.json";
import it from "../public/locales/it/common.json";

export const translations = { es, en, it } as const;
export type Lng = keyof typeof translations;

export function getT(lng: Lng) {
  return translations[lng] as typeof en;
}
