import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const publicDirectory = path.join(root, "public");
const sourceDirectory = path.join(root, "src");
const sourceExtensions = new Set([".css", ".ts", ".tsx"]);
const imageExtensions = new Set([
  ".avif",
  ".gif",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);
const localImageReference =
  /["'](\/(?:images|logos)\/[^"']+?\.(?:avif|gif|jpe?g|png|svg|webp))["']/gi;

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const entryPath = path.join(directory, entry.name);

    return entry.isDirectory() ? walk(entryPath) : [entryPath];
  });
}

const references = new Map();

for (const file of walk(sourceDirectory)) {
  if (!sourceExtensions.has(path.extname(file))) continue;

  const source = fs.readFileSync(file, "utf8");

  for (const match of source.matchAll(localImageReference)) {
    const reference = match[1];
    const referencingFile = path.relative(root, file);
    const files = references.get(reference) ?? [];

    references.set(reference, [...files, referencingFile]);
  }
}

const invalidReferences = [...references].flatMap(([reference, files]) => {
  const asset = path.join(publicDirectory, reference.slice(1));

  if (fs.existsSync(asset) && fs.statSync(asset).size > 0) return [];

  return [{ reference, files }];
});
const zeroByteImages = walk(publicDirectory).filter(
  (file) => imageExtensions.has(path.extname(file).toLowerCase()) &&
    fs.statSync(file).size === 0,
);

if (invalidReferences.length > 0 || zeroByteImages.length > 0) {
  for (const { reference, files } of invalidReferences) {
    console.error(`Missing image: ${reference} (${files.join(", ")})`);
  }

  for (const file of zeroByteImages) {
    console.error(`Zero-byte image: ${path.relative(root, file)}`);
  }

  process.exitCode = 1;
} else {
  console.log(
    `Validated ${references.size} local image references; no missing or zero-byte assets.`,
  );
}
