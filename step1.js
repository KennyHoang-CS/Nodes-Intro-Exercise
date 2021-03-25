const fs = require('fs');
const process = require('process');

function cat(path){
    fs.readFile(path, 'utf8', (err, data)  => {
        if (err) {
            console.log("ERROR:", err);
        }
        console.log(data);
    })
}

cat(process.argv[2]);