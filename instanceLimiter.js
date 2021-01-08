var instanceLimiter = (func, limit) => {
    var x = 0;
    let queue = [];
    var funcRun = async () => {
        if(x < limit && queue.length > 0 ){
            a = queue.shift()
            let func = a[0]
            let args = a[1]
            let resolve = a[2]
            x++
            result =  await func(...args);
            x--
            resolve(result);
            funcRun()
        }
    }
    return function(...args) {
        return new Promise((resolve)=> {
            queue.push([func, args, resolve]);
            funcRun();
        })   
    }
}


module.exports = {
    instanceLimiter,
}
