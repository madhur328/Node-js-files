const fs = require("fs");
const path = require('path');
const got = require("got");

var writeToDisc = async(student, dir) => {
    let url = student.image
    let fileName = path.join(dir, path.basename(url))
    let downloadStream = got.stream(url);
    let fileWriterStream = fs.createWriteStream(fileName);
    downloadStream.pipe(fileWriterStream);
    return new Promise((resolve)=> {
        fileWriterStream.on("close", resolve)
    })
}

module.exports = {
    writeToDisc : writeToDisc
}