process.env.NODE_ENV = "production";
process.env.BABEL_ENV = "production";
process.on("unhandledRejection", (reason) => { throw reason; });

const fs = require("fs/promises");
const path = require("path");
const webpack = require("webpack");
const paths = require("../config/paths");
const { loadEnv } = require("../config/env");

loadEnv();

async function copyPublicAssets() {
  const entries = await fs.readdir(paths.appPublic, { withFileTypes: true });
  await Promise.all(entries.filter((entry) => entry.name !== "index.html").map(async (entry) => {
    const source = path.join(paths.appPublic, entry.name);
    const destination = path.join(paths.appBuild, entry.name);
    await fs.cp(source, destination, { recursive: true });
  }));
}

async function build() {
  await fs.rm(paths.appBuild, { recursive: true, force: true });
  await fs.mkdir(paths.appBuild, { recursive: true });
  await copyPublicAssets();

  const configFactory = require("../config/webpack.config");
  const config = configFactory({}, { mode: "production" });
  webpack(config, (error, stats) => {
    if (error) {
      console.error("Webpack build failed:", error.stack || error);
      if (error.details) console.error(error.details);
      process.exitCode = 1;
      return;
    }

    const info = stats.toJson({ all: false, errors: true, warnings: true, timings: true });
    if (stats.hasErrors()) {
      console.error("Build failed with errors:");
      for (const item of info.errors) console.error(item.message || item);
      process.exitCode = 1;
      return;
    }

    if (info.warnings.length) {
      console.warn(`Build completed with ${info.warnings.length} warning(s):`);
      for (const item of info.warnings) console.warn(item.message || item);
      if (process.env.CI && process.env.CI.toLowerCase() !== "false") {
        console.error("CI=true: warnings are treated as errors.");
        process.exitCode = 1;
        return;
      }
    }

    console.log(`Build completed successfully in ${info.time} ms.`);
  });
}

build().catch((error) => {
  console.error("Build script failed:", error.stack || error);
  process.exitCode = 1;
});
