import * as sloth from "sloth-log";
const readline = require("readline-sync");

const repeatWord = (word: string, times: number = 10, delimiter: string = " "): string => {
    if (!delimiter) {
        delimiter = " "
    }
    let response : string[] = [];
    for (let i=0;i<times;i++) {
        response.push(word);
    }
    return response.join(delimiter);
}

let answer = "";
do {
    answer = readline.question("> ");
    let rnd = Math.floor(Math.random() * 3);
    let punct = "";
    switch (rnd) {
        case 0: punct = "!"; break;
        case 1: punct = "."; break;
        case 2: punct = "?"; break;
    }

    sloth.log(repeatWord("Meow", Math.floor(Math.random() * 15)) + punct, {
        speed: 500,
        maxWordsAtOnce: 4
    })
} while (answer.toUpperCase() !== "BYE");
