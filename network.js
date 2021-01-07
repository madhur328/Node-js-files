const got = require('got');
/*
async function start() {
    const response = await got('https://age-of-empires-2-api.herokuapp.com/api/v1/unit/11');
    var unit = JSON.parse(response.body);
    console.log(JSON.parse(response.body));
}

start();
*/

(async() => {
    const response1 = await got('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations');
    var civilizations = JSON.parse(response1.body).civilizations;
    for(var i=0; i< civilizations.length; i++){
        var civilization = civilizations[i]
        var civ_name = civilization.name
        var civ_printable = ""
        civ_printable += `${civ_name} have `
        civ_tech_no = civilization.unique_tech.length 
        if (civ_tech_no === 0) { civ_printable += 'No unique tech bonus'}
        for(var j=0; j < civ_tech_no; j++) {
            if(j !== 0) { civ_printable += ' and '}
            var civ_unique_tech_url = civilization.unique_tech[j]
            var response = await got(civ_unique_tech_url);
            var unique_tech = JSON.parse(response.body)
            civ_printable += `${unique_tech.name} that gives bonus of ${unique_tech.description}`           
        }  
        console.log(civ_printable)
    }
})()
