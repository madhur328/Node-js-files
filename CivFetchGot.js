const  got  =  require('got')
const fetch = require('node-fetch')

const gotCivDetails = () => {
    return got('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')
        .then((response) => JSON.parse(response.body))
        .then((json) => json.civilizations)
        .then((civs) => {
            const civ_output_arr = []   // We store all civilization string outputs in this array
            let output_arr_resolve  // when civilization output array is finalized, we resolve its value
            let output_arr_length = civs.length // We resolve it when all civilizations are resolved and this value reduces to zero
            
            for( let civilization of civs ) {
                let civ_tech_array = [];    // array to store intermediate processed unique tech urls responses in below for loop
                let civ_name  = civilization.name; //eg. Aztecs
                let url_tech_array = civilization.unique_tech;
                for (let url_tech of url_tech_array) {
                    let response = got(url_tech)
                    civ_tech_array.push(response)
                }
                // eg. tech_detail_array is like promise of [["Garland Wars", "+4 Infantary Attack"], [..., ....]]
                // Obtained as a promise after civ_tech_array has been fully processed
                let tech_detail_array = Promise.all(civ_tech_array).then((arr) => {
                    return arr.map((elem) => {
                        let tech = JSON.parse(elem.body);
                        return [tech.name, tech.description]
                    });
                })
                // Final formatting for each civilization
                tech_detail_array.then((tech__arr) => {
                    let output_str = `${civ_name} have`
                    if(civ_tech_array.length === 0) {               // Not sure why writing tech__arr.length === 0 gives wrong output
                        output_str += " no unique tech bonus.";
                    }
                    for(let i=0; i < tech__arr.length; i++) {
                        let tech = tech__arr[i]
                        let tech_name = tech[0];    // "Garland Wars"
                        let tech_desc = tech[1];    // "+4 Infantary attack"
                        if(i !== 0) {
                            output_str += " and "
                        }
                        output_str += ` ${tech_name} that gives ${tech_desc}`
                    }
                    civ_output_arr.push(output_str)
                    output_arr_length--
                    if(output_arr_length === 0) {output_arr_resolve(civ_output_arr)}    // All civilizations have been processed
                })
            }
            return new Promise((resolve) => {output_arr_resolve = resolve})
        })
}


const fetchCivDetails = () => {
    return fetch('https://age-of-empires-2-api.herokuapp.com/api/v1/civilizations')
        .then((response) => response.json())
        .then((json) => json.civilizations)
        .then((civs) => {
            const civ_output_arr = []   // We store all civilization string outputs in this array
            let output_arr_resolve  // when civilization output array is finalized, we resolve its value
            let output_arr_length = civs.length // We resolve it when all civilizations are resolved and this value reduces to zero
            for( let civilization of civs ) {
                let civ_tech_array = [];    // array to store intermediate processed unique tech urls responses in below for loop
                let civ_name  = civilization.name; //eg. Aztecs
                let url_tech_array = civilization.unique_tech;
                for (let url_tech of url_tech_array) {
                    let response = fetch(url_tech)
                    civ_tech_array.push(response)
                }  
                // eg. tech_detail_array is like promise of [["Garland Wars", "+4 Infantary Attack"], [..., ....]]
                // Obtained as a promise after civ_tech_array has been fully processed
                let tech_detail_array = (
                    Promise.all(civ_tech_array)
                    .then((arr) => Promise.all(arr.map((response) => response.json())))
                    .then((arr) => arr.map((tech) => [tech.name, tech.description]))
                )
                // Final formatting for each civilization
                tech_detail_array.then((tech__arr) => {
                    let output_str = `${civ_name} have`
                    if(civ_tech_array.length === 0) {               // Not sure why writing tech__arr.length === 0 gives wrong output
                        output_str += " no unique tech bonus.";
                    }
                    for(let i=0; i < tech__arr.length; i++) {
                        tech = tech__arr[i]
                        let tech_name = tech[0];    // "Garland Wars"
                        let tech_desc = tech[1];    // "+4 Infantary attack"
                        if(i !== 0) {
                            output_str += " and "
                        }
                        output_str += ` ${tech_name} that gives ${tech_desc}`
                    }
                    civ_output_arr.push(output_str)
                    output_arr_length--
                    if(output_arr_length === 0) {output_arr_resolve(civ_output_arr)}    // All civilizations have been processed
                })
            }
            return new Promise((resolve) => {output_arr_resolve = resolve})
        })
}




