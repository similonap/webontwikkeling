const readline = require('readline-sync');

const assertTwoDigit = (digits: string, fieldName: string) => {
    if (isNaN(Number(digits[0])) || isNaN(Number(digits[1]))) {
        throw fieldName + " should have two digits";
    }
}

const assertNumber = (digits: string, fieldName: string) => {
    if (isNaN(Number(digits))) {
        throw fieldName + " should be a number";
    }
}

const calculateMinutesBetween = (hour1: string, minute1: string, hour2: string, minute2: string ) => {
    if (isNaN(Number(hour1))) {
        throw "hour [from] must be a number";
    }
    if (isNaN(Number(hour2))) {
        throw "hour [to] must be a number";
    }
    if (isNaN(Number(minute1))) {
        throw "minute [from] must be a number";
    }
    if (isNaN(Number(minute2))) {
        throw "minute [to] must be a number";
    }
    assertNumber(hour1, "hour [from]");
    assertNumber(hour2, "hour [to]");
    assertNumber(minute1, "minute [from]");
    assertNumber(minute2, "minute [to]");
    assertTwoDigit(hour1, "hour [from]");
    assertTwoDigit(hour2, "hour [to]");
    assertTwoDigit(minute1, "minute [from]");
    assertTwoDigit(minute2, "minute [to]");
    if (Number(hour1) < 0 || Number(hour1) > 23) {
        throw "hour [from] must be between 0 and 24";
    }
    if (Number(hour2) <= 0 || Number(hour2) > 23) {
        throw "hour [to] must be between 0 and 24";
    }
    if (Number(minute1) <= 0 || Number(minute1) > 60) {
        throw "minutes [from] must be between 0 and 60";
    }
    if (Number(minute2) <= 0 || Number(minute2) > 60) {
        throw "minutes [to] must be between 0 and 60";
    }

    if (Number(hour1+minute1) > Number(hour2+minute2)) {
        throw "the first timestamp should be before the second";
    }

    return (Number(hour2) - Number(hour1)) * 60 + (Number(minute2) - Number(minute1));
    

}


while (true) {
    try {
        const hourFrom   = readline.question("HH [From]: ");
        const minuteFrom = readline.question("MM [From]: ");

        const hourTo   = readline.question("HH [To]: ");
        const minuteTo = readline.question("MM [To]: ");

        console.log("These timestamps are " + calculateMinutesBetween(hourFrom, minuteFrom, hourTo, minuteTo) + " minutes apart");
        break;
    } catch (e) {
        console.log(e);
    }
}


export {}