process.env.NODE_ENV = "test";
process.env.BABEL_ENV = "test";
process.on("unhandledRejection", (reason) => { throw reason; });

const { spawnSync } = require("child_process");
const result = spawnSync(process.execPath, ["--test"], { stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
