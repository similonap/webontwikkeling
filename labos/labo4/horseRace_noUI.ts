interface Horse {
    track: number;
    name: string;
    position: number;
}

const runHorse = (horse: Horse): Promise<Horse> => {
    return new Promise((resolve, reject) => {
        let cb = setInterval(() => {
            let speedNextStep = Math.floor(Math.random() * 5) + 1;
            if (horse.position + speedNextStep >= 100) {
                horse.position = 100;
            } else {
                horse.position += speedNextStep;
            }
            console.log(horse.name + " is at position " + horse.position);
            if (horse.position >= 100) {
                clearInterval(cb);
                resolve(horse);
            }
        }, 500);
    });
}

const start = () => {

    let horses: Horse[] = [
        { name: "A", position: 0, track: 1 },
        { name: "B", position: 0, track: 2 },
        { name: "C", position: 0, track: 3 },
    ]
    
    Promise.race(
        horses.map((horse) => runHorse(horse))
    ).then((horse) => {
        console.log(horse.name + " won!")
    });
}

start();