import { ReactElement } from "react";

interface LogProps {
  logs: Map<ChildNode, number>;
}

export function Logs({ logs }: LogProps): ReactElement {
  return (
    <div className="flex-1">
      <h3 className="text-lg font-bold">Logs</h3>
      <ul className="border border-gray-400 rounded-md p-4">
        {Array.from(logs.entries()).map(([key, value]) => (
          <li>{`TextNode: ${key.textContent} rendered ${value} times`}</li>
        ))}
      </ul>
    </div>
  );
}
