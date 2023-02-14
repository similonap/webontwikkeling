const sloth = require("sloth-log");
const readline = require("readline-sync");

interface Student {
    name: string;
    age: number;
    enrollmentDate?: Date;
}

const enroll = (student: Student, date: Date = new Date()): void => {
    student.enrollmentDate = date;
}

const joske : Student = {name: "Joske", age: 3};

enroll(joske);

console.log(joske);


function concat(a: string, b: string): string {
    return `${a}${b}`;
}

console.log(concat("AB","BA"));

function repeatWord(word: string, times: number = 10, delimiter: string = " "): string {
    if (!delimiter) {
        delimiter = " "
    }
    let response : string[] = [];
    for (let i=0;i<times;i++) {
        response.push(word);
    }
    return response.join(delimiter);
}

console.log(repeatWord("na", 5));