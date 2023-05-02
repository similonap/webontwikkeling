import Terminal from "terminal-kit";

const terminal = Terminal.terminal;

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

            terminal.moveTo( 1 , horse.track , " ".repeat(horse.position) + " " + horse.name ) ;
            if (horse.position >= 100) {
                clearInterval(cb);
                resolve(horse);
            }
        }, 1000);
    });
}

const start = () => {
    terminal.clear();
    terminal.hideCursor();

    let horses: Horse[] = [
        { name: "A", position: 0, track: 1 },
        { name: "B", position: 0, track: 2 },
        { name: "C", position: 0, track: 3 },
    ]
    
    for (let horse of horses) {
        terminal.moveTo( 100 , horse.track , "|" ) ;
    }
    
    Promise.race(
        horses.map((horse) => runHorse(horse))
    ).then((horse) => {
        terminal.moveTo( 110, horse.track , "WINNER!" ) ;
    });
}

start();