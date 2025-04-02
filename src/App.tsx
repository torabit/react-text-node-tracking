import { useEffect, useRef, useState } from "react";
import { LocaleProvider, Translate } from "@hi18n/react";

import { book, Locale } from "./_assets/translate";
import { Button } from "./_components/button";
import { TrailOfBreadCrumbs } from "./examples/trail-of-bread-crumbs";
import { Logs } from "./_components/logs";
import { formatHtmlString } from "./_utils/format-html-string";
import { HtmlStructure } from "./_components/html-structure";

function App() {
  const [locale, setLocale] = useState<Locale>("en");
  const toggleLocale = () => setLocale((prev) => (prev === "en" ? "ja" : "en"));

  const ref = useRef<HTMLDivElement>(null);
  const [breadcrumbs, setBreadcrumbs] = useState(0);
  const [textNodeMap, setTextNodeMap] = useState<Map<ChildNode, number>>(
    new Map()
  );
  const [htmlCode, setHtmlCode] = useState("");

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(() => {
        // console.group("DOM Mutation");
        // console.log("Type:", mutation.type);
        // console.log("Target:", mutation.target);
        // if (mutation.type === "childList") {
        //   console.log("Added nodes:", mutation.addedNodes);
        //   console.log("Removed nodes:", mutation.removedNodes);
        // } else if (mutation.type === "characterData") {
        //   console.log("Old value:", mutation.oldValue);
        //   console.log("New value:", mutation.target.textContent);
        // }
        // console.groupEnd();

        const html = element?.innerHTML;
        setHtmlCode(formatHtmlString({ html }));
      });
    });

    observer.observe(element, {
      childList: true,
      subtree: true,
      characterData: true,
      characterDataOldValue: true,
    });

    const html = element.innerHTML;
    setHtmlCode(formatHtmlString({ html }));

    return () => observer.disconnect();
  }, [locale]);

  useEffect(() => {
    if (!ref.current) return;

    const children = Array.from(ref.current.children);
    children.forEach((child) => {
      const textNode = child.firstChild;

      if (textNode) {
        // console.group("TextNode Update");
        // console.log("Node:", textNode);
        // console.log("Content:", textNode.textContent);
        // console.log("Parent:", textNode.parentNode);
        // console.log(
        //   "Previous content in Map:",
        //   textNodeMap.get(textNode)
        // );
        // console.groupEnd();

        setTextNodeMap((prevMap) => {
          const newMap = new Map(prevMap);
          const currentRenderingRound = prevMap.get(textNode) || 0;
          newMap.set(textNode, currentRenderingRound + 1);
          return newMap;
        });
      }
    });
  }, [breadcrumbs]);

  return (
    <LocaleProvider locales={locale}>
      <div className="flex jutify-between flex-col min-h-screen text-gray-700">
        <main className="p-6 flex-1 h-full flex flex-col gap-12">
          <h2 className="text-2xl font-bold">React Text Node Tracking</h2>
          <Button onClick={toggleLocale}>{locale}</Button>

          <div className="flex gap-4 items-center">
            <div ref={ref} className="flex-1">
              <TrailOfBreadCrumbs breadcrumbs={breadcrumbs} />
            </div>
            <div className="flex-1">
              <Button
                wFull={true}
                onClick={() => setBreadcrumbs((prev) => prev + 1)}
              >
                <Translate book={book} id="leaves-a-trail-of-bread-crumbs" />
              </Button>
            </div>
          </div>

          <div className="flex gap-4">
            <Logs logs={textNodeMap} />
            <HtmlStructure html={htmlCode} />
          </div>
        </main>
      </div>
    </LocaleProvider>
  );
}

export default App;
