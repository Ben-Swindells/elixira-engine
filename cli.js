#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const args = process.argv.slice(2);

function copyTemplateFiles(targetDir) {
  const templateDir = path.join(__dirname, "template");

  fs.readdirSync(templateDir).forEach((file) => {
    const srcFile = path.join(templateDir, file);
    const destFile = path.join(targetDir, file);

    fs.copyFileSync(srcFile, destFile);
    console.log(`Created ${file}`);
  });
}

function createProject(targetPath) {
  const targetDir = path.resolve(process.cwd(), targetPath);

  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  console.log(`Creating project in ${targetDir}...`);
  copyTemplateFiles(targetDir);
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
