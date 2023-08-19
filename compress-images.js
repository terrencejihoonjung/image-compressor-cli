#!/usr/bin/env node

// import required modules
const fs = require("node:fs");
const path = require("node:path");
const sharp = require("sharp");
const { program } = require("command");

// Define CLI program
program
  .version("1.0.0") // sets version # of CLI application
  .description("CLI application to compress images") // provides description of what CLI app does (--help)
  .requiredOption("-i, --input <path>", "Input directory containing images") // define option flags -i and --input for specifying input
  .option("-o, --output <path>", "Output directory for compressed image") // defines option flags -o --output for specifying output
  .parse(process.argv); // prases command-line arguments provided by user and makes values available in program object

// Parse command line arguments
const { input, output } = program;

// Check if input directory exists
if (!fs.existsSync(input)) {
  console.error("Input directory does not exist"); // output error in console
  process.exit(1); // exits CLI program
}
