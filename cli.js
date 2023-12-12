#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const args = process.argv.slice(2);

function initializeProject(targetDir) {
  // Check if the target directory is empty. If not, you might want to abort or warn the user.
  if (fs.readdirSync(targetDir).length > 0) {
    console.error("Target directory is not empty.");
    process.exit(1);
  }

  // Here, add the logic to initialize your game engine environment.
  // This might include creating configuration files, directories, etc.
  console.log(`Initializing project in ${targetDir}...`);

  // Example: Create a config file
  fs.writeFileSync(
    path.join(targetDir, "config.json"),
    JSON.stringify({
      /* initial config data */
    })
  );

  // If your setup includes installing dependencies or running scripts, do it here
  // For example, to run 'npm install':
  child_process.execSync("npm install", { stdio: "inherit", cwd: targetDir });
}

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);

  // Create the target directory if it does not exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  initializeProject(targetDir);
}

switch (args[0]) {
  case "create":
    const targetPath = args[1] || ".";
    createProject(targetPath);
    break;
  // Additional cases for other commands
  default:
    console.log("Command not recognized");
}
