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
    return getFirstParagraphFromNode(htmlObject.window.document);
  }
  return getFirstParagraphFromNode(main);
}

function getFirstParagraphFromNode(node: Document | HTMLElement): string {
  const paragraph = node.querySelector("p");
  if (!paragraph) {
    return "";
  }
  return paragraph.textContent;
}

export function getURLsFromHTML(html: string, baseURL: string): string[] {
  const urls: string[] = [];
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const anchors = doc.querySelectorAll("a");

    anchors.forEach((anchor) => {
      const href = anchor.getAttribute("href");
      if (!href) return;

      try {
        const absoluteURL = new URL(href, baseURL).toString();
        urls.push(absoluteURL);
      } catch (err) {
        console.error(`invalid href '${href}':`, err);
      }
    });
  } catch (err) {
    console.error("failed to parse HTML:", err);
  }
  return urls;
}

export function getImagesFromHTML(html: string, baseURL: string): string[] {
  const imageURLs: string[] = [];
  try {
    const dom = new JSDOM(html);
    const doc = dom.window.document;
    const images = doc.querySelectorAll("img");

    images.forEach((img) => {
      const src = img.getAttribute("src");
      if (!src) return;

      try {
        const absoluteURL = new URL(src, baseURL).toString();
        imageURLs.push(absoluteURL);
      } catch (err) {
        console.error(`invalid src '${src}':`, err);
      }
    });
  } catch (err) {
    console.error("failed to parse HTML:", err);
  }
  return imageURLs;
}
