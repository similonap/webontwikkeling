interface Person {
    name: string;
    yearOfBirth: number;
    placeOfBirth: string;
  }

const input: Person[] = [
  {
    name: "Andie",
    yearOfBirth: 1984,
    placeOfBirth: "Mortsel",
  },
  {
    name: "Joachim",
    yearOfBirth: 1995,
    placeOfBirth: "Mortsel",
  },
  {
    name: "Bert",
    yearOfBirth: 1995,
    placeOfBirth: "Edegem",
  },
  {
    name: "Timo",
    yearOfBirth: 2005,
    placeOfBirth: "Antwerpen",
  },
];


interface Dictionary {
  [key: string | number]: Person[]
}

let obj : Dictionary = {};
for (let person of input) {
    if (obj[person.placeOfBirth]) {
        obj[person.placeOfBirth].push(person);
    } else {
        obj[person.placeOfBirth] = [person];
    }
}
console.log(obj);

export {}