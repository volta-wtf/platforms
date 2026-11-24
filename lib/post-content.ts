import { NodeHtmlMarkdown } from "node-html-markdown";

const htmlBlockStart =
  /^\s*<(?:!doctype|html|body|article|div|p|h[1-6]|ul|ol|li|blockquote|pre|table|figure|section|hr|img)\b/i;
const escapedHtmlBlockStart =
  /^\s*&lt;(?:!doctype|html|body|article|div|p|h[1-6]|ul|ol|li|blockquote|pre|table|figure|section|hr|img)\b/i;

/** Normalize legacy HTML posts to the Markdown format used by Novel. */
export function normalizePostContent(content: string | null | undefined) {
  let normalized = content ?? "";

  // Some legacy saves HTML-escaped Novel's HTML output. Translating once
  // decodes that layer; the next pass converts the recovered HTML to Markdown.
  for (let pass = 0; pass < 4; pass += 1) {
    if (
      !htmlBlockStart.test(normalized) &&
      !escapedHtmlBlockStart.test(normalized)
    ) {
      break;
    }

    const translated = NodeHtmlMarkdown.translate(normalized).trim();
    if (translated === normalized) break;
    normalized = translated;
  }

  return normalized;
}
