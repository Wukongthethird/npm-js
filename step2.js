"use strict"

const fsP = require("fs/promises");

const argv = process.argv;

async function cat(filename) {
  try {
    let contents = await fsP.readFile(`${filename}`, "utf8");
    console.log("file contents", contents);
  } catch (err) {
    process.exit(1);
  }
}

async function webCat(url) {
    
}

cat( argv[2] )

