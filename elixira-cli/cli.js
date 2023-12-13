#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const child_process = require("child_process");

const args = process.argv.slice(2);

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);
  const allowedFiles = [".git", "package.json", "README.md"];

  if (fs.existsSync(targetDir)) {
    const existingFiles = fs.readdirSync(targetDir);

    const disallowedFiles = existingFiles.filter(
      (file) => !allowedFiles.includes(file)
    );
    if (disallowedFiles.length > 0) {
      console.error("The following files/directories are not allowed:");
      disallowedFiles.forEach((file) => {
        console.error(file);
      });
      process.exit(1);
    }
  }

  console.log(`Creating project in ${targetDir}...`);

  // Clone the repository into a temporary directory
  const repoUrl = "https://github.com/Ben-Swindells/elixira-engine.git"; // Repository URL
  const tempDir = path.join(targetDir, "_tempClone");
  const templateBranch = "default-template"; // Set the branch you want to clone
  child_process.execSync(
    `git clone --depth 1 --branch ${templateBranch} ${repoUrl} "${tempDir}"`,
    {
      stdio: "inherit",
    }
  );
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

  // Initialize Git in the target directory
  child_process.execSync(`git init`, { stdio: "inherit", cwd: targetDir });

  // Add a secondary remote for fetching updates from elixira-engine
  child_process.execSync(`git remote add elixira-engine ${repoUrl}`, {
    stdio: "inherit",
    cwd: targetDir,
  });

  console.log("Project created and Git initialized successfully.");
}

function updateProject() {
  const projectDir = process.cwd();

  console.log(`Checking for updates in ${projectDir}...`);

  try {
    // Fetch the latest repository data from elixira-engine remote
    child_process.execSync(`git fetch elixira-engine`, {
      stdio: "inherit",
      cwd: projectDir,
    });

    // Check git status to determine if local is behind remote
    const status = child_process.execSync(`git status`, {
      encoding: "utf-8",
      cwd: projectDir,
    });

    if (status.includes("Your branch is behind")) {
      console.log("Updates found, updating Elixira engine...");
      child_process.execSync(`git pull elixira-engine default-template`, {
        stdio: "inherit",
        cwd: projectDir,
      });
      console.log("Project updated successfully.");
    } else {
      console.log("No updates available.");
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
