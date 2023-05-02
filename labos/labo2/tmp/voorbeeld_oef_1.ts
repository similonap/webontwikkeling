const readline = require('readline-sync');

const dnaMatch = (sequence1: string, sequence2: string): number => {
    if (sequence1.length === 0 || sequence2.length === 0) {
        throw "Sequences must be of length > 0";
    }
    if (sequence1.length !== sequence2.length) {
        throw "Sequences must be of equal length";
    }
    let matches = 0;
    for (let i = 0; i < sequence1.length; i++) {
        if (sequence1[i] !== "A" && sequence1[i] !== "C" && sequence1[i] !== "G" && sequence1[i] !== "T") {
            throw "Invalid character in sequence 1";
        }
        if (sequence2[i] !== "A" && sequence2[i] !== "C" && sequence2[i] !== "G" && sequence2[i] !== "T") {
            throw "Invalid character in sequence 2";
        }
        if (sequence1[i] === sequence2[i]) {
            matches++;
        }
    }

    return matches / sequence1.length * 100;
}

let keepAsking : boolean = false;
do {
    try {
        let sequence1: string = readline.question("Geef een DNA sequentie [1]: ");
        let sequence2: string = readline.question("Geef een DNA sequentie [2]: ");
        console.log(`De sequenties zijn ${dnaMatch(sequence1, sequence2)}% identiek`);
        break;
    } catch (e) {
        console.log(e);
    }
} while (true)
