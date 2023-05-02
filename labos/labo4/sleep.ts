const sleep = (ms: number): Promise<void> => new Promise((resolve, reject) => setTimeout(resolve, ms));


Promise.race([ 
    sleep(1000).then(() => console.log("1")),
    sleep(2000).then(() => console.log("2")),
    sleep(3000).then(() => console.log("3")),
]).then(() => console.log("Done!"));

