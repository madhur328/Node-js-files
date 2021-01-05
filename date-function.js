const { addDays, format, differenceInDays } = require('date-fns');


function addDateSimple(nDays) {
    var newDate = addDays(new Date(), nDays)
    var formattedDate = format(newDate, 'dd/MM/yyyy')
    return formattedDate
}


function diffCalcSimple(birthDay) {
    date1 = new Date(birthDay)
    function madhurDiff(dateString) {
        date2 = new Date(dateString)
        var dayDiff = differenceInDays(date2, date1)
        return  dayDiff
    }
    return madhurDiff
}


function addDate(nDays) {
    let date = new Date()
    date.setDate(date.getDate() + nDays)
    return date.toLocaleDateString("en-GB")
}



function diffCalc(birthDay) {
    date1 = new Date(birthDay)
    function madhurDiff(dateString) {
        date2 = new Date(dateString)
        var diff = date2 - date1
        var dayDiff = Math.round(diff/(1000*3600*24))
        return  dayDiff
    }
    return madhurDiff
}

module.exports = {
    'diffCalc' : diffCalc,
    'addDate': addDate,
    'diffCalcSimple': diffCalcSimple,
    'addDateSimple':addDateSimple,
} 