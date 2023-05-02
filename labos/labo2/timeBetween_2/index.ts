const readline = require("readline-sync");

const assertNumber = (digits: string, fieldName: string) => {
    if (isNaN(Number(digits))) {
        throw fieldName + " must be a number";
    }
}

const calculateMinutesBetween = (hour1: string, minute1: string, hour2: string, minute2: string ): number => {
    assertNumber(hour1, "Hour [from]");
    assertNumber(hour2, "Hour [to]");
    assertNumber(minute1, "Minute [from]");
    assertNumber(minute2, "Minute [to]");

    let minutesBetween: number = (Number(hour2) - Number(hour1)) * 60 + (Number(minute2) - Number(minute1))
    return minutesBetween;
}

try {
    const hourFrom : string = readline.question("HH [From]: ");
    const minuteFrom : string = readline.question("MM [From]: ");
    const hourTo : string = readline.question("HH [To]: ");
    const minuteTo : string = readline.question("MM [To]: ");

    console.log(`These timestamps are ${calculateMinutesBetween(hourFrom, minuteFrom, hourTo, minuteTo)} minutes apart `);
} catch (e : any) {
    console.error("ERROR: " + e);
}