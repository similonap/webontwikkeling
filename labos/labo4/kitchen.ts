interface Oven {
    degrees: number;
    targetDegrees: number;
    maxDegrees: number;
    timer: number;
}

let oven: Oven = {
    degrees: 0,
    targetDegrees: 0,
    maxDegrees: 200,
    timer: 0
}

const startPreheat = (oven: Oven, targetDegrees: number) => {
    oven.targetDegrees = targetDegrees;
    return new Promise<Oven>((resolve, reject) => {
        let cb = setInterval(() => {
            console.log("Increasing temperature to " + oven.targetDegrees + " degrees (currently " + oven.degrees + " degrees)");
            if (oven.degrees > oven.maxDegrees) reject("Oven can't go above " + oven.maxDegrees + " degrees!");
            oven.degrees += 10;
            if (oven.degrees >= oven.targetDegrees) {
                clearInterval(cb);
                console.log("Oven is ready!");
                resolve(oven);
            }
        }, 1000)
    });
}

const startTimer = (oven: Oven, timer: number) => {
    return new Promise<Oven>((resolve, reject) => {
        if (oven.degrees <= 0) reject("Oven is not hot enough to start the timer!");
        let cb = setInterval(() => {
            console.log("Timer: " + oven.timer + " seconds");
            oven.timer += 1;
            if (oven.timer >= timer) {
                clearInterval(cb);
                console.log("Timer done!")
                resolve(oven);
            }
        }, 1000)
    });
}

const coolDown = (oven: Oven) => {
    return new Promise<Oven>((resolve, reject) => {
        let cb = setInterval(() => {
            console.log("Decreasing temperature to 0 degrees (currently " + oven.degrees + " degrees)");
            oven.degrees -= 10;
            if (oven.degrees <= 0) {
                clearInterval(cb);
                console.log("Oven is cool! Shutting down!");
                resolve(oven);
            }
        }, 1000)
    });
}
  
startPreheat(oven, 100)
    .then(oven => startTimer(oven, 10))
    .then(oven => coolDown(oven))
    .catch(err => console.log(err));