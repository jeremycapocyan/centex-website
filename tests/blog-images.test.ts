import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { posts } from "../src/lib/blog";

test("every published journal entry has a local image and descriptive alternative text", () => {
  for (const post of posts) {
    assert.match(post.image, /^\/images\/[a-z0-9-]+\.(webp|jpg|png)$/);
    assert.ok(existsSync(join(process.cwd(), "public", post.image)), `Missing image for ${post.slug}`);
    assert.ok(post.imageAlt.trim().split(/\s+/).length >= 5, `Describe the image for ${post.slug}`);
  }
});
