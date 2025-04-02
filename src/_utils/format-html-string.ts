export function formatHtmlString({
  html,
}: // element,
{
  html: string;
  // element: HTMLElement;
}) {
  // console.group("HTML Structure Change");
  // console.log("Raw HTML:", html);

  // const beforeStructure = new Map();
  // const afterStructure = new Map();
  // function mapStructure(node, map) {
  //   if (node.nodeType === Node.TEXT_NODE) {
  //     map.set(node, {
  //       type: "text",
  //       content: node.textContent,
  //       parent: node.parentNode,
  //     });
  //   } else if (node.nodeType === Node.ELEMENT_NODE) {
  //     map.set(node, {
  //       type: "element",
  //       tagName: node.nodeName,
  //       attributes: Array.from(node.attributes),
  //       children: Array.from(node.childNodes),
  //     });
  //   }
  // }

  // // 既存のDOM構造を記録
  // const walkNode = (node) => {
  //   mapStructure(node, beforeStructure);
  //   node.childNodes.forEach(walkNode);
  // };
  // walkNode(element);

  const div = document.createElement("div");
  div.innerHTML = html;

  const result: string[] = [];
  let indentLevel = 0;

  // ノードを再帰的に処理する関数
  function processNode(node: HTMLDivElement) {
    if (node.nodeType === Node.TEXT_NODE) {
      const textContent = node.textContent?.trim();
      if (textContent) {
        result.push("  ".repeat(indentLevel) + textContent); // インデント追加
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      const attributes = Array.from(node.attributes || [])
        .map((attr) => `${attr.name}=${attr.value}`)
        .filter(Boolean)
        .join(" ");
      result.push(
        "  ".repeat(indentLevel) +
          `<${node.nodeName.toLowerCase()}${
            attributes ? " " + attributes : ""
          }>`
      ); // 開タグ
      indentLevel++; // 子ノードの処理時にインデントを増やす

      Array.from(node.childNodes).forEach((child) =>
        processNode(child as HTMLDivElement)
      ); // 子ノードを再帰的に処理

      indentLevel--; // 親ノードに戻ったらインデントを減らす
      result.push(
        "  ".repeat(indentLevel) + `</${node.nodeName.toLowerCase()}>`
      ); // 閉タグ
    }
  }

  processNode(div);

  // console.log("Before structure:", beforeStructure);
  // console.log("After structure:", afterStructure);
  // console.groupEnd();

  return result.join("\n");
}
