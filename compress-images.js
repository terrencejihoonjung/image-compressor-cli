#!/usr/bin/env node

// import required modules
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");
const { program } = require("commander");

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
  process.exit(1); // exits CLI program, any non-zero exit code is an error basically
}

// Check if output directory exists
if (output && !fs.existsSync(output)) {
  try {
    fs.mkdirSync(output, { recursive: true }); // creates directories necessary from beginning to end
  } catch (error) {
    console.error(`Error creating output directory: ${error.message}`);
    process.exit(1);
  }
}

// Image Compressing Function
function compressImage(inputPath, outputPath, file) {
  sharp(inputPath)
    .toFile(outputPath) // to the output path
    .then(() => console.log(`Compressed ${file}`)) // returns promise if successful
    .catch(
      (error) => console.error(`Error compressing ${file}: ${error.message}`) // catches error that rises
    );
}

// Compressing Images in Current Directory
function compressImages(input, output) {
  const files = fs.readdirSync(input); // Reads files in current directory

  for (const file of files) {
    const inputPath = path.join(input, file); // path of file being compressed
    const outputPath = output ? path.join(output, file) : inputPath; // saving compressed file to path

    compressImage(inputPath, outputPath, file);
  }
}

compressImages(input, output);
