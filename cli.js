#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const args = process.argv.slice(2);

function initializeProject(targetDir) {
  const allowedFiles = [".git", "package.json"]; // Add other file/directory names if needed
  const files = fs.readdirSync(targetDir);

  // Check if directory contains files other than the allowed ones
  const containsOtherFiles = files.some((file) => !allowedFiles.includes(file));
  if (containsOtherFiles) {
    console.error("Target directory contains files other than allowed ones.");
    process.exit(1);
  }

  console.log(`Initializing project in ${targetDir}...`);
  // Additional initialization logic here
}

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);

  // Create the target directory if it does not exist
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  initializeProject(targetDir);

  console.log("Copying template files...");
  const templateDir = path.join(__dirname, "default-template");
  fs.readdirSync(templateDir, { withFileTypes: true }).forEach((dirent) => {
    const sourcePath = path.join(templateDir, dirent.name);
    const targetPath = path.join(targetDir, dirent.name);

    if (dirent.isDirectory()) {
      fs.mkdirSync(targetPath, { recursive: true });
    } else {
      fs.copyFileSync(sourcePath, targetPath);
    }
  });

  // Run npm install to install dependencies
  console.log("Installing dependencies...");
  child_process.execSync("pnpm install", { stdio: "inherit", cwd: targetDir });
}

switch (args[0]) {
  case "create":
    const targetPath = args[1] || ".";
    createProject(targetPath);
    break;
  default:
    console.log("Command not recognized");
}
