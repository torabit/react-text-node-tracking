import { ReactElement } from "react";
import { Code } from "./code";

interface HtmlStructureProps {
  html: string;
}

export function HtmlStructure({ html }: HtmlStructureProps): ReactElement {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-bold">HTML Structure</h3>
      <div className="border border-gray-400 rounded-md p-4">
        <Code code={html} />
      </div>
    </div>
  );
}
