const { uniqueNamesGenerator, names, countries, NumberDictionary} = require('unique-names-generator')

function test(a,b) {
    return a - b;
}

function createStudent() {
    const randomName = uniqueNamesGenerator({
        dictionaries: [names, names],
        length: 2,
        separator: " "
      });
      const _class = Math.floor(Math.random() * 12)
      const place = uniqueNamesGenerator({
        dictionaries: [countries],
      });
    return  {'name':randomName,
            'class':_class,
            'place': place}
}


function flattenAnyDim(arr, flattened=[]) {
    for(var i=0;i<arr.length;i++) {
        if (typeof arr[i] !== 'object') {
            flattened.push(arr[i]);
            console.log(flattened);
        } else {
            flattenAnyDim(arr[i], flattened=flattened);
        }
    }
    return flattened       
}

function flatten(arr) {
    var flattened = []
    for(var i=0; i<arr.length;i++) {
        if(typeof arr[i] !== 'object') {
            flattened.push(arr[i])
        } else {
            for(var j=0;j<arr[i].length;j++) {
                flattened.push(arr[i][j])
            }
        }
    }
    return flattened
}



module.exports = {
    test_renamed: test,
}