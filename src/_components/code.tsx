import { useEffect, useState } from "react";
import { codeToHtml } from "shiki/bundle/web";

type Props = {
  code: string;
};

export function Code({ code }: Props) {
  const [htmlCode, setHtmlCode] = useState("");

  useEffect(() => {
    if (code) {
      (async () => {
        const html = await codeToHtml(code, {
          lang: "tsx",
          theme: "github-light",
        });

        setHtmlCode(html);
      })();
    }
  }, [code]);

  if (!code) {
    return null;
  }

  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlCode }}
      className="p-2 md:px-4 md:py-0 bg-transparent [&>*]:!bg-transparent"
    />
  );
}
