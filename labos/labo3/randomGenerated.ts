interface OnRandomGenerated {
    (number: number): void
}

const generateRandomNumbers = (interval: number, onRandomGenerated: OnRandomGenerated) => {
    setInterval(() => {
        onRandomGenerated(Math.floor(Math.random() * 100))
    },interval);
}


generateRandomNumbers(1000, (number) => {
    console.log("Generator 1: " + number);
});

generateRandomNumbers(2000, (number) => {
    console.log("Generator 1: " + number);
});

export {};