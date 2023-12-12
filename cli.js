#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const args = process.argv.slice(2);

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);

  // Check if the target directory is valid
  if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
    console.error("Target directory is not empty.");
    process.exit(1);
  }

  console.log(`Creating project in ${targetDir}...`);

  // Clone the repository
  const repoUrl = "https://github.com/Ben-Swindells/elixira-engine"; // Replace with your repo URL
  child_process.execSync(`git clone ${repoUrl} "${targetDir}"`, {
    stdio: "inherit",
  });

  console.log("Project created successfully.");
}
switch (args[0]) {
  case "create":
    const targetPath = args[1] || ".";
    createProject(targetPath);
    break;
  default:
    console.log("Command not recognized");
}
