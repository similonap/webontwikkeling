const filterPositive = (numbers: number[]) => {
    let newArray : number[] = [];

    for (let number of numbers) {
        if (number >= 0) {
            newArray.push(number)
        }
    }

    return newArray;
}

const filterNegative = (numbers: number[]) => {
    let newArray : number[] = [];

    for (let number of numbers) {
        if (number < 0) {
            newArray.push(number)
        }
    }

    return newArray;
}

const numbers: number[] = [-4,-4,1,2,3,4,5];

console.log(filterPositive(numbers));
console.log(filterNegative(numbers));

export {}