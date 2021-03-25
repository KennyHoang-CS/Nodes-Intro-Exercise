const fs = require('fs');
const process = require('process');
const axios = require('axios');

// Handle the output. 
function handleOutput(text, out){
    if (out){
        fs.writeFile(out, text, 'utf8', function(err){
            if (err){
                console.error("ERROR:", err);
            }
            else{
                console.log(`Successfully written to ${out}.`);
            }
        });
    } else{
        console.log(text);
    }
}

// Print contents from a file. 
function cat(path, out){
    fs.readFile(path, 'utf8', function(err, data){
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        } else{
            handleOutput(data, out);    // Pass response to handle function.
        }
    });
}

// Print contents from an url. 
async function webCat(url, out){
    try{
        let response = await axios.get(url);
        handleOutput(response.data, out);   // Pass response to handle function. 
    }catch(err){
        console.error(`Error fetching ${url}: ${err}`);
        process.exit(1);
    }
}

let path;
let out;

// If it's an output command. 
if (process.argv[2] === '--out'){
    out = process.argv[3];      // the destination.
    path = process.argv[4];     // the source. 
} else{
    path = process.argv[2];     // not an output command. 
}

// check if the path is an url. 
if (path.slice(0, 4) === 'http'){
    webCat(path, out);
} // must be a file then. 
else {
    cat(path, out);
}