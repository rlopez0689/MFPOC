const path = require("path");

const appDirectory = path.resolve(__dirname, "..");

module.exports = {
  appDirectory,
  appSrc: path.join(appDirectory, "src"),
  appPublic: path.join(appDirectory, "public"),
  appHtml: path.join(appDirectory, "public", "index.html"),
  appIndex: path.join(appDirectory, "src", "index.tsx"),
  appBuild: path.join(appDirectory, "build"),
  appNodeModules: path.join(appDirectory, "node_modules")
};
