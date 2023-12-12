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
  const defaultTemplateRepoUrl =
    "https://github.com/Ben-Swindells/elixira-engine/tree/main/default-template"; // Replace with your repo URL
  child_process.execSync(`git clone ${defaultTemplateRepoUrl} "${targetDir}"`, {
    stdio: "inherit",
  });

  console.log("Project created successfully.");
}

function updateProject() {
  const projectDir = process.cwd();

  console.log(`Updating project in ${projectDir}...`);

  // Pull the latest changes from the repository
  try {
    child_process.execSync(`git pull origin main`, {
      stdio: "inherit",
      cwd: projectDir,
    });
    console.log("Project updated successfully.");
  } catch (error) {
    console.error("Error updating project:", error.message);
  }
}

switch (args[0]) {
  case "create":
    const targetPath = args[1] || ".";
    createProject(targetPath);
    break;
  case "update":
    updateProject();
    break;
  default:
    console.log("Command not recognized");
}
