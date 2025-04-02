import { Catalog, msg } from "@hi18n/core";
import { Vocabulary } from ".";

export default new Catalog<Vocabulary>("en", {
  landmark: msg("A landmark on the way home"),
  "breadcrumb-trails": msg(
    "There are <span>{breadcrumbs, number}</span> trails of {breadcrumbs, plural, one {crumb} other {crumbs}} <BreadEmoji/>"
  ),
  "leaves-a-trail-of-bread-crumbs": msg("Leaves a trail of bread crumbs"),
});
