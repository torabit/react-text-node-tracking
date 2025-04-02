import { Translate } from "@hi18n/react";
import { ReactElement } from "react";

import { book } from "../_assets/translate";

function BreadEmoji(): ReactElement {
  return <span>🍞</span>;
}

interface Props {
  breadcrumbs: number;
}

export function TrailOfBreadCrumbs({ breadcrumbs }: Props): ReactElement {
  return (
    <div>
      <Translate book={book} id="landmark" />
      {": "}
      <Translate
        book={book}
        id="breadcrumb-trails"
        breadcrumbs={breadcrumbs}
        BreadEmoji={<BreadEmoji />}
        span={<span className="text-orange-500 font-bold" />}
      />
    </div>
  );
}
