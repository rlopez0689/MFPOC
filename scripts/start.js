process.env.NODE_ENV = "development";
process.env.BABEL_ENV = "development";
process.on("unhandledRejection", (reason) => { throw reason; });

const fs = require("fs");
const path = require("path");
const open = require("open");
const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const paths = require("../config/paths");
const { loadEnv } = require("../config/env");

loadEnv();
for (const file of [paths.appHtml, paths.appIndex, path.join(paths.appDirectory, ".babelrc")]) {
  if (!fs.existsSync(file)) {
    console.error(`Required file is missing: ${file}`);
    process.exit(1);
  }
}

const configFactory = require("../config/webpack.config");
const config = configFactory({}, { mode: "development" });
const compiler = webpack(config);
const server = new WebpackDevServer(config.devServer, compiler);
let shuttingDown = false;

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  console.log(`\n${signal} received. Stopping development server...`);
  await server.stop();
  process.exit(0);
}

process.once("SIGINT", () => shutdown("SIGINT"));
process.once("SIGTERM", () => shutdown("SIGTERM"));

server.start().then(() => {
  const url = `http://${config.devServer.host === "0.0.0.0" ? "localhost" : config.devServer.host}:${config.devServer.port}`;
  console.log(`Development server running at ${url}`);
  if (process.env.BROWSER === "none") return undefined;
  return open(url).catch((error) => console.warn(`Could not open a browser automatically: ${error.message}`));
}).catch((error) => {
  console.error("Failed to start webpack-dev-server:", error);
  process.exit(1);
});
