#!/usr/bin/env node

const esbuild = require("esbuild");
const fs = require("fs/promises");
const child_process = require("child_process");
const path = require("path");

async function build() {
  const version = process.argv[2];
  if (!version) {
    console.error("Please specify a version to build.");
    process.exit(1);
  }

  await fs.rm("dist", { recursive: true, force: true });
  await fs.rm("release.zip", { force: true });
  await fs.mkdir("dist", { recursive: true });

  await esbuild.build({
    entryPoints: ["repos/cli/src/bin/index.ts"],
    platform: "node",
    format: "cjs",
    outfile: "dist/index.cjs",
    bundle: true,
    external: ["tree-sitter", "tree-sitter-c", "@designliquido/llvm-bindings"],
    loader: {
      ".node": "empty",
    },
    define: {
      "import.meta.filename": "__filename",
      "import.meta.dirname": "__dirname",
      kina_bsm_is_built: "true",
      kina_bsm_version: JSON.stringify(version),
    },
  });

  await fs.writeFile(
    "dist/package.json",
    JSON.stringify(
      {
        name: "kina",
        version: "0.0.0",
        main: "index.cjs",
        dependencies: {
          "@designliquido/llvm-bindings": "^9.1.0",
          "tree-sitter": "^0.25.0",
          "tree-sitter-c": "^0.24.1",
        },
      },
      null,
      2,
    ),
  );

  await fs.writeFile("dist/.npmrc", "legacy-peer-deps=true\n");

  await fs.mkdir("dist/platform/runtime", { recursive: true });
  await fs.mkdir("dist/platform/include", { recursive: true });
  await copyFiles("repos/runtime/build", "dist/platform/runtime", (name) =>
    name.endsWith(".a"),
  );
  await copyFiles("repos/runtime/include", "dist/platform/include");

  // Package into zip
  const proc = child_process.spawn(
    "bash",
    ["-c", "cd dist && zip -r ../release.zip ."],
    {
      stdio: "inherit",
    },
  );

  await new Promise((resolve, reject) => {
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`zip process exited with code ${code}`));
    });
  });
}

async function copyFiles(src, dest, filter) {
  src = path.resolve(process.cwd(), src);
  dest = path.resolve(process.cwd(), dest);

  const entries = await fs.readdir(src, { withFileTypes: true });
  await fs.mkdir(dest, { recursive: true });

  let copiedCount = 0;

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory())
      copiedCount += await copyFiles(srcPath, destPath, filter);
    else {
      if (filter && !filter(entry.name)) continue;

      await fs.copyFile(srcPath, destPath);
      copiedCount++;
    }
  }

  if (copiedCount === 0) await fs.rm(dest, { recursive: true });

  return copiedCount;
}

build();
