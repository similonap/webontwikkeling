// Import readline-sync 
const readlineSync = require("readline-sync");

// Declare checkKnightMove function
const checkKnightMove = (col: number, row: number, colTo: number, rowTo: number): void => {
    // Check if the parameters are out of bounds
    if (col < 0 || row < 0 || colTo < 0 || rowTo < 0 || col > 8 || row > 8 || colTo > 8 || rowTo > 8) {
        throw Error('ERROR: Out of bounds');
    }
    // Check if the parameters are a valid move
    if (Math.abs(col - colTo) === 2 && Math.abs(row - rowTo) === 1 || Math.abs(col - colTo) === 1 && Math.abs(row - rowTo) === 2) {
        console.log('Valid move');
    } else {
        throw Error('ERROR: Invalid move');
    }
};

// Prompt the user to enter the column, row, columnTo and rowTo
console.log('Enter column:');
let col: number = parseInt(readlineSync.question());

console.log('Enter row:');
let row: number = parseInt(readlineSync.question());

console.log('Enter column to:');
let colTo: number = parseInt(readlineSync.question());

console.log('Enter row to:');
let rowTo: number = parseInt(readlineSync.question());

// Call checkKnightMove function
try {
    checkKnightMove(col, row, colTo, rowTo);
} catch (error : any) {
    console.log(error.message);
}