interface Calculation {(a:number, b:number):number}

const printCalculationResult = (a: number, b: number, func: Calculation) => {
    console.log(func(a,b));
}

const mult : Calculation = (a,b) => { return a*b; }
const div : Calculation = (a,b) => { return a / b; };
const add : Calculation = (a,b) => { return a + b; };


printCalculationResult(1,2, mult);

export {}