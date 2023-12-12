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

  console.log(`Creating project in ${targetDir}...`);

  const repoUrl = "https://github.com/Ben-Swindells/elixira-engine.git"; // Repository URL
  const tempDir = path.join(targetDir, "_tempClone"); // Temporary directory for cloning

  // Clone the repository into a temporary directory
  child_process.execSync(`git clone ${repoUrl} "${tempDir}"`, {
    stdio: "inherit",
  });

  // Copy the contents of the default-template to the target directory
  const templateDir = path.join(tempDir, "default-template");
  fs.readdirSync(templateDir).forEach((file) => {
    const srcPath = path.join(templateDir, file);
    const destPath = path.join(targetDir, file);
    if (fs.statSync(srcPath).isDirectory()) {
      fs.cpSync(srcPath, destPath, { recursive: true });
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });

  // Cleanup: Remove the temporary clone directory
  fs.rmdirSync(tempDir, { recursive: true });

  console.log("Project created successfully.");
}

function updateProject() {
  const projectDir = process.cwd();

  console.log(`Checking for updates in ${projectDir}...`);

  try {
    // Fetch the latest repository data
    child_process.execSync(`git fetch`, { stdio: "inherit", cwd: projectDir });

    // Check if there are updates
    const status = child_process.execSync(`git status -uno`, {
      encoding: "utf-8",
      cwd: projectDir,
    });

    if (status.includes("Your branch is up to date")) {
      console.log("No updates available.");
    } else {
      console.log("Updates found, updating Elixira engine...");

      // Pull the latest changes
      child_process.execSync(`git pull`, { stdio: "inherit", cwd: projectDir });
      console.log("Project updated successfully.");
    }
  } catch (error) {
    console.error("Error while updating project:", error.message);
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
