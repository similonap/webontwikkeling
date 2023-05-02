import pc from "picocolors"


interface Animal {
    name:string,
    age:number,
    type:string
}

interface CreateFunction {
    (name: string, age: number): Animal
}

interface TestFunction {
    (animal: Animal): boolean
   }

//enum Types {"dog", "cat", "hamster"}

const createAnimalFactory = (type: string) : CreateFunction => {
// cat
if (type != "dog" || type != "cat" || type != "hamster"){
    
}
else{
    throw "Only dogs, cats or hamsters allowed!";
}

    return (nameIn, ageIN) => {
        return {
            name: nameIn,
            age: ageIN,
            type: type
        };
    };
   
}

const isRodent: TestFunction = (animal) => {

    if(animal.type == "hamster") return true;

    return false;
}

const isOld: TestFunction = (animal) => {
    
    if(animal.type ==  "cat"){
        if(animal.age > 14) return true;
        return false;
    }
    else if (animal.type == "dog"){
        if(animal.age > 12) return true;
        return false;
    }
    else{
        if(animal.age > 2) return true;
        return false;
    }

}

const contains = (animals: Animal[], func: TestFunction):boolean =>{

    let contain: boolean = false
    animals.forEach(animal => {

        if(func(animal))
            contain = true;       
    });

    return contain;
}

const showAnimals = (animals: Animal[]) => {

    animals.forEach(animal => {

        if(isOld(animal))
            console.log(`${pc.red(animal.name)}`);
        else
            console.log(`${pc.green(animal.name)}`);
    });
}



try{
    let createDog = createAnimalFactory("dog");
    let createCat = createAnimalFactory("cat");
    let createHamster = createAnimalFactory("hamster");

    let animals: Animal[] = [
        createDog("Flooferd", 5),
        createDog("Bassy", 13),
        createDog("Bolt", 7),
        createCat("Minoes", 6),
        createCat("Nestor", 15),
        createCat("Plato", 16),
        createCat("Kitkat", 3),
        createHamster("G-force", 3),
        createHamster("Alvin", 2),
        createHamster("Munk", 1)
    ];

    console.log(contains(animals, isOld));
    console.log(contains(animals, isRodent));

    showAnimals(animals);
    

}
catch(e:any){
    console.log(e);
}



   