const readline = require("readline-sync");

const assertNumber = (digits: string, fieldName: string) => {
    if (isNaN(Number(digits))) {
        throw fieldName + " must be a number";
    }
}

const calculateMinutesBetween = (hour1: string, minute1: string, hour2: string, minute2: string ): number => {

    assertNumber(hour1, "hour [1]");
    assertNumber(hour2, "hour [2]");
    assertNumber(minute1, "minute [1]");
    assertNumber(minute2, "minute [2]");

    return ((Number(hour2) - Number(hour1)) * 60 + (Number(minute2) - Number(minute1)));
}

let running = true;
while (running) {
    try {
        const hour1 : string = readline.question("HH1: ");
        const minute1 : string = readline.question("MM1: ");
        const hour2 : string = readline.question("HH2: ");
        const minute2 : string = readline.question("MM2: ");
        console.log(calculateMinutesBetween(hour1,minute1, hour2, minute2));
        running = false;
    } catch (e) {
        console.error("Error: " + e);
        running = true;
    }
}