import { JSDOM } from "jsdom";

export function normalizeURL(urlToNormalize: string): string {
  const url = new URL(urlToNormalize);
  const pathname = url.pathname.at(-1) !== "/" ? url.pathname : url.pathname.slice(0, -1)
  const normalizedUrl = url.host + pathname;
  return normalizedUrl;
}

export function getH1FromHTML(html: string): string {
  const htmlObject = new JSDOM(html);
  const header = htmlObject.window.document.querySelector("h1");
  if (!header) {
    return "";
  }
  return header.textContent
}

export function getFirstParagraphFromHTML(html: string): string {
  const htmlObject = new JSDOM(html);
  const main = htmlObject.window.document.querySelector("main");
  if (!main) {
    return getFirstParagraphFromNode(htmlObject.window.document)
  }
  return getFirstParagraphFromNode(main)
}

function getFirstParagraphFromNode(node: Document | HTMLElement): string {
  const paragraph = node.querySelector("p");
  if (!paragraph) {
      return "";
    }
  return paragraph.textContent
}