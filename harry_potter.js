const got = require("got");
const fs = require("fs");
const {writeToDisc} = require('./writeToDisc.js');
const {instanceLimiter} = require('./instanceLimiter.js');

(async() => {
    limitedWriter = instanceLimiter(writeToDisc, 1);
    const dir = './Students/Gryffindor/';
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    } else {
        fs.rmdirSync(dir, { recursive: true });
        fs.mkdirSync(dir, { recursive: true });
    }
    var response = await got("http://hp-api.herokuapp.com/api/characters/students")
    var students = JSON.parse(response.body)
    for(i=0; i<students.length; i++) {
        let student = students[i]
        if(student.house === "Gryffindor") {
            limitedWriter(student, dir);
        }
    }
})()
