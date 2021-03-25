const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', (err, data)  => {
        if (err) {
            console.log(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    })
}

async function webCat(url){
    
    try{
        const response = await axios.get(url);
        console.log(response.data)
    }catch(err){
        console.log(`Error fetching ${url}: ${url}`);
        process.exit(1);
    }
}

if (process.argv[2].slice(0, 4) === 'http'){
    webCat(process.argv[2]);
} 
else {
    cat(process.argv[2]);
}