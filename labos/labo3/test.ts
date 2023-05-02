interface Calculation {(a:number, b:number):number}

const printCalculationResult = (a: number,b: number, func: Calculation) => {
    console.log(func(a,b));
}

const mult : Calculation = (a,b) => a*b;

const add : Calculation = (a,b) => a+b;

printCalculationResult(2,4, add);
printCalculationResult(2,4, mult);