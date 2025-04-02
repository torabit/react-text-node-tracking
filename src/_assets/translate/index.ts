import { Book, ComponentPlaceholder, Message } from "@hi18n/core";

import catalogEn from "./en";
import catalogJa from "./ja";

export type Locale = "en" | "ja";

export type Vocabulary = {
  landmark: Message;
  "breadcrumb-trails": Message<{
    breadcrumbs: number;
    span: ComponentPlaceholder;
    BreadEmoji: ComponentPlaceholder;
  }>;
  "leaves-a-trail-of-bread-crumbs": Message;
};

export const book = new Book<Vocabulary>({
  en: catalogEn,
  ja: catalogJa,
});
