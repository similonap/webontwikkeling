interface Callback {
    (n: number): void
}

const getRandom = (): Promise<number> => {
    return new Promise<number>((resolve, reject) => {
        setTimeout(() => {
            resolve(Math.floor(Math.random() * 100))
        },1000);
    })

}

getRandom().then((v) => console.log(v));

const main = async() => {
    let result = await getRandom();
    console.log(result);
}
main();

export {}