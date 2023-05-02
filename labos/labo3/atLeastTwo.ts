interface TestFunction {
    (n: number): boolean
}

const isOdd : TestFunction = (n) => n % 2 != 0;
const isEven : TestFunction = (n) => n % 2 == 0;
const isPostive : TestFunction = (n) => n >= 0;
const isLargerThan4 : TestFunction = (n) => n > 4;

const atLeastTwo = (numbers: number[], testFunction: TestFunction) => {
    let i = 0;
    for (let number of numbers) {
        if (testFunction(number)) {
            i++;
        }
    }
    return i >= 2;
}

console.log(atLeastTwo([2,3,4,6,8,5], isOdd));
console.log(atLeastTwo([2,3,4,6,8,5], isEven));
console.log(atLeastTwo([2,3,4,6,8,5], isPostive));
console.log(atLeastTwo([2,3,4,6,8,5], isLargerThan4));