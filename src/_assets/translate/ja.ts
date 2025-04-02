import { Catalog, msg } from "@hi18n/core";
import { Vocabulary } from ".";

export default new Catalog<Vocabulary>("ja", {
  landmark: msg("帰り道の目印"),
  "breadcrumb-trails": msg(
    "パンくずの道しるべは <span>{breadcrumbs, number}</span> 個あります <BreadEmoji/>"
  ),
  "leaves-a-trail-of-bread-crumbs": msg("パンくずを落とす"),
});
