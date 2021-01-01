const {uniqueNamesGenerator, starWars, animals} = require('unique-names-generator')
const random = require('random-name')

function createStudent() {
    var name = random.first();
    if ((Math.ceil(10 * Math.random()) === 1)) {
        name += " " + random.middle();
    }
    name += " " + random.last();
    var place = random.place();
    var pet = uniqueNamesGenerator({dictionaries:[animals], length:1});
    return {'name':name, 'place':place, 'pet':pet}
}

function createClass() {
    var arr = [];
    var k = (Math.ceil(31* Math.random())) + 19;
    for(var i=0; i<k; i++) {
        arr.push(createStudent());
    }
    return arr;
}

function createSchool() {
    var schoolPlace = random.place();
    var schoolName = schoolPlace + " High School";
    var classes = [];
    for(var i=0; i<12; i++) {
        classes.push(createClass())
    }
    return {"school_name":schoolName, "school_place":schoolPlace, "classes":classes}
}

/*
console.log(createStudent());
console.log(createClass());
console.log(createSchool());

*/

function aaa () {
    console.log(createStudent());
    var _class = Math.ceil(12 * Math.random());
    console.log(_class);
    setTimeout(aaa, _class*1000);
}
aaa()