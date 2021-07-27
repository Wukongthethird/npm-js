"use strict"

const fsP = require("fs/promises");
const axios = require("axios");
const argv = process.argv;

async function cat(filename) {
  try {
    let contents = await fsP.readFile(`${filename}`, "utf8");
    console.log("file contents:", contents);
  } catch (err) {
    console.log(`Error fetching ${filename}:
            ${filename} isn't a valid path`);
    process.exit(1);
  }
}

async function webCat(url) {
    try {
        const resp = await axios.get(url);
        console.log(resp.data);
    } catch (err) {
        console.log(`Error fetching ${url}:
            ${url} isn't a valid url`);
        process.exit(1);
    }
}

if (argv[2].startsWith('http')) {
    webCat(argv[2]);
} else {
    cat(argv[2]);
}

