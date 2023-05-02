interface Condition {
    (): boolean;
}

const waitFor = (condition: Condition, timeout: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        let time = 0;
        let cb = setInterval(() => {
            time += 100;
            if (time >= timeout) {
                clearInterval(cb);
                reject("Timeout!");
            }
            if (condition()) {
                clearInterval(cb);
                resolve();
            }
        }, 100);
    });
}

// wait for date time to be 5 seconds in the future

let date = new Date();
date.setSeconds(date.getSeconds() + 100);
waitFor(() => new Date() >= date, 10000).then(() => console.log("Woo!"));