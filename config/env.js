const dotenv = require("dotenv");
const fs = require("fs");
const paths = require("./paths");

function loadEnv() {
  const envFiles = [
    `.env.${process.env.NODE_ENV}.local`,
    ".env.local",
    `.env.${process.env.NODE_ENV}`,
    ".env"
  ];

  for (const file of envFiles) {
    const fullPath = `${paths.appDirectory}/${file}`;
    if (fs.existsSync(fullPath)) dotenv.config({ path: fullPath, override: false });
  }
}

function getClientEnvironment() {
  const raw = Object.keys(process.env)
    .filter((key) => key.startsWith("REACT_APP_"))
    .reduce((env, key) => {
      env[key] = process.env[key];
      return env;
    }, { NODE_ENV: process.env.NODE_ENV });

  return {
    raw,
    stringified: Object.fromEntries(
      Object.entries(raw).map(([key, value]) => [`process.env.${key}`, JSON.stringify(value)])
    )
  };
}

module.exports = { loadEnv, getClientEnvironment };
