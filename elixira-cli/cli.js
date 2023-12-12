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

  // Clone the repository into a temporary directory
  const repoUrl = "https://github.com/Ben-Swindells/elixira-engine.git"; // Repository URL
  const tempDir = path.join(targetDir, "_tempClone");
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

  // Initialize Git and set remote to elixira-engine repository
  child_process.execSync(`git init`, { stdio: "inherit", cwd: targetDir });
  child_process.execSync(`git remote add origin ${repoUrl}`, {
    stdio: "inherit",
    cwd: targetDir,
  });

  console.log("Project created and Git initialized successfully.");
}

function updateProject() {
  const projectDir = process.cwd();

  console.log(`Updating project in ${projectDir}...`);

  // Pull the latest changes from the elixira-engine repository
  try {
    child_process.execSync(`git fetch --all`, {
      stdio: "inherit",
      cwd: projectDir,
    });
    child_process.execSync(`git reset --hard origin/main`, {
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
