const slowSum = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a+b);
        },1000)
    });
}

const slowMult = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(a*b);
        },1500)
    });
}

const slowDiv = (a: number, b: number) => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            if (b == 0) {
                reject("You cannot divide by zero");
            } else {
                resolve(a/b);
            }
        },2000)
    });
}

// slowSum(1,5).then(result => console.log(result));
// slowDiv(1,5).then(result => console.log(result));
// slowMult(1,5).then(result => console.log(result));


const main = async() => {
    console.log(await slowSum(1,5));
    console.log(await slowDiv(1,5));
    console.log(await slowMult(1,5));
}
main();