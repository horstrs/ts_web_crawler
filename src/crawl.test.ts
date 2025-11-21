import { expect, test } from "vitest";
import { normalizeURL } from "./crawl.js";

test("Normalize URL", () => {
  expect(normalizeURL("https://blog.boot.dev/path/")).toBe("blog.boot.dev/path");
  expect(normalizeURL("https://blog.boot.dev/path2?query=string")).toBe("blog.boot.dev/path2?query=string");
  expect(normalizeURL("http://user:pass@blog.boot.dev/path3/")).toBe("blog.boot.dev/path3");
  expect(normalizeURL("http://blog.boot.dev:8081/path4")).toBe("blog.boot.dev:8081/path4");
});