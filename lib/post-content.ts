import { NodeHtmlMarkdown } from "node-html-markdown";

const htmlBlockStart =
  /^\s*<(?:!doctype|html|body|article|div|p|h[1-6]|ul|ol|li|blockquote|pre|table|figure|section|hr|img)\b/i;

/** Normalize legacy HTML posts to the Markdown format used by Novel. */
export function normalizePostContent(content: string | null | undefined) {
  if (!content || !htmlBlockStart.test(content)) {
    return content ?? "";
  }

  return NodeHtmlMarkdown.translate(content).trim();
}
