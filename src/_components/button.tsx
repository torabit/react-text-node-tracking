import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>> & {
  size?: "sm" | "md";
  wFull?: boolean;
};

export function Button({ children, size = "md", wFull, ...rest }: Props) {
  return (
    <button
      type="button"
      className={[
        "border border-gray-500 rounded-md py-1 px-4 hover:text-blue-700 hover:border-blue-700",
        size === "sm" ? ["text-sm"] : [],
        wFull ? ["w-full"] : ["w-fit"],
        "cursor-pointer",
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );
}
