import test from "node:test";
import assert from "node:assert/strict";
import { formatDate } from "../src/lib/blog";

test("source dates retain their published precision", () => {
  assert.equal(formatDate("2026-09"), "September 2026");
  assert.equal(formatDate("2026-10-13"), "October 13, 2026");
});
