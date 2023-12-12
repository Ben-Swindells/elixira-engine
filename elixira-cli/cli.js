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
    console.error("Target directory is not empty.");
    process.exit(1);
  }
  console.log(`Installing Elixira Engine in ${targetDir}...`);
  // Additional initialization logic here
}

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);

  initializeProject(targetDir);

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
