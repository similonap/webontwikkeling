import picocolors from "picocolors";

interface TestFunction {
    (animal: Animal): boolean
}

interface CreateFunction {
    (name: string, age: number): Animal;
}
interface Animal{
  name: string,
  age: number,
  type: string
}
const createAnimalFactory = (type: string): CreateFunction => {
    if (type !== "cat" && type !== "dog" && type !== "hamster") {
        throw new Error("Something went wrong");
    }
    return (name: string, age: number): Animal => {
        return {
            name : name, 
            age : age, 
            type: type
        };
    }
};

const contains = (animals: Animal[], test: TestFunction): boolean => {
    for (const animal of animals){
        if(test(animal)){
            return true;
        }
    }
    return false;
}

const showAnimals = (animals: Animal[]) => {
    for (const animal of animals) {
        if (isOld(animal)) {
            console.log(picocolors.red(animal.name));
        } else {
            console.log(picocolors.green(animal.name));
        }
    }
}

const isRodent : TestFunction = animal => animal.type == "hamster";
const isOld : TestFunction = animal => {
    if (animal.type === "cat") {
        return animal.age > 14;
    } else if (animal.type === "dog") {
        return animal.age > 12;
    } else if (animal.type === "hamster"){
        return animal.age > 2;
    }
    return false;
} 

try {
    // createAnimalFactory("snake");
    const createDog: CreateFunction = createAnimalFactory("dog");
    const createCat: CreateFunction = createAnimalFactory("cat");
    const createHamster: CreateFunction = createAnimalFactory("hamster");
    
    const animals : Animal[] = [
        createDog("Joske", 12),
        createDog("Billy", 8),
        createHamster("Gerald", 4),
        createCat("Dafke", 7),
        createCat("Mick", 9),
        createCat("Plato", 16),
        createHamster("G-force", 3),
        createCat("Kitkat", 3),
        createHamster("Roberto", 2),
        createDog("Hanna", 1)
    ];

    console.log(contains(animals, isRodent));
    console.log(contains(animals, isOld));
    
    showAnimals(animals);
} catch (e : any) {
    console.error(e.message);
}

