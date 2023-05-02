const sloth = require("sloth-log");
// import { log } from "sloth-log";


interface Student {
    name: string;
    age: number;
}

let andie: Student = {
    name: "Andie Similon",
    age: 38
}

console.log(andie.name);

interface Add {
    (a: number, b: number): number
}

const add : Add = (a, b) => {
    return a+b;
}

const add2: Add = (a,b) => {
    return (a+b)*2
}