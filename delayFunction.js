const delay = time => new Promise(resolve => setTimeout(resolve, time));

(async () => {
    console.log("immediate");
    await delay(3000);
    console.log("delayed");
})()

module.exports = {
    
}