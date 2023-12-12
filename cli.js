#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const args = process.argv.slice(2);

function initializeProject(targetDir) {
  const files = fs.readdirSync(targetDir);

  // Check if directory is empty or only contains a .git folder
  if (files.length > 0 && !(files.length === 1 && files[0] === ".git")) {
    console.error("Target directory is not empty.");
    process.exit(1);
  }

  console.log(`Initializing project in ${targetDir}...`);
  // Your initialization logic here

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
