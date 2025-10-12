import { h } from "vue";

export function toParagraph(text: string) {
  const parts = text.split("\n");
  return h(
    "p",
    {},
    parts.flatMap((line, i) =>
      i < parts.length - 1 ? [line, h("br")] : [line]
    )
  );
}
