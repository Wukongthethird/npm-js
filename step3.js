"use strict"

const fsP = require("fs/promises");
const axios = require("axios");
const argv = process.argv;

async function cat(filename) {
    try {
        let contents = await fsP.readFile(`${filename}`, "utf8");
        // console.log("file contents:", contents);
        return contents

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
        return resp.data

    } catch (err) {
        console.log(`Error fetching ${url}:
            ${url} isn't a valid url`);
        process.exit(1);
    }
}

async function textWriter(text, fileName) {
    try {
        await fsP.writeFile(fileName, text, "utf8");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Successfully wrote to file!");
}

async function handler(){
    
    if (argv[2] === "--out") {
        let text;
        if (argv[4].startsWith('http')) {
            text = await webCat( argv[4]) 
        } else {
            text = await cat(argv[4])
        }

        textWriter(text, argv[3])

}
    else {
        if (argv[2].startsWith('http')) {
           console.log(await webCat(argv[2]))
        } else {
            console.log(await cat(argv[2]))
        }
    }
}


handler()

// if (argv[2] === "--out") {

//     if (argv[4].startsWith('http')) {
//         textWriter(webCat( argv[4]) ,  argv[3])
//     } else {
//         textWriter(cat(argv[4]), argv[3])
//     }
// }
// else {
//     if (argv[2].startsWith('http')) {
//         webCat(argv[2]);
//     } else {
//         cat(argv[2]);
//     }
// }

