import { expect, test } from "vitest";
import { getFirstParagraphFromHTML, getH1FromHTML, normalizeURL } from "./crawl.js";

test("Normalize URL", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  expect(normalizeURL("https://blog.boot.dev/path2?query=string")).toBe("blog.boot.dev/path2");
  expect(normalizeURL("http://user:pass@blog.boot.dev/path3/")).toBe("blog.boot.dev/path3");
  expect(normalizeURL("http://blog.boot.dev:8081/path4")).toBe("blog.boot.dev:8081/path4");
});

test("getH1FromHTML basic", () => {
  const inputBody = `<html><body><h1>Test Title</h1></body></html>`;
  const actual = getH1FromHTML(inputBody);
  const expected = "Test Title";
  expect(actual).toEqual(expected);
});

test("getH1FromHTML no header", () => {
  const inputBody = `<html><body><p>Paragraph only.</p></body></html>`;
  const actual = getH1FromHTML(inputBody);
  const expected = "";
  expect(actual).toEqual(expected);
});

test("getFirstParagraphFromHTML main priority", () => {
  const inputBody = `
    <html><body>
      <p>Outside paragraph.</p>
      <main>
        <p>Main paragraph.</p>
      </main>
    </body></html>
  `;
  const actual = getFirstParagraphFromHTML(inputBody);
  const expected = "Main paragraph.";
  expect(actual).toEqual(expected);
});

test("getFirstParagraphFromHTML no main", () => {
  const inputBody = `
    <html><body>
      <p>First paragraph.</p>
      <p>Second paragraph.</p>
    </body></html>
  `;
  const actual = getFirstParagraphFromHTML(inputBody);
  const expected = "First paragraph.";
  expect(actual).toEqual(expected);
});