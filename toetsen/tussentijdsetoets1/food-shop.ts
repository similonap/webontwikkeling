import pc from "picocolors";

interface CreateFunction {
    (name: string, calories: number): Food;
}

interface Food {
    name: string;
    type: string;
    calories: number;
}

interface TestFunction {
    (food: Food): boolean
}

const all = (foods: Food[], test: TestFunction) => {
    for (let food of foods) {
        if (!test(food)) {
            return false;
        }
    }
    return true;
}

const isVegan : TestFunction = (food) => {
    // if (food.type === "meat") {
    //     return false;
    // } else {
    //     return true;
    // }
    return food.type !== "meat";
}

const isHealthy : TestFunction = (food) => {
    if (food.type === "meat") {
        return food.calories < 150;
    } else if (food.type === "fruit") {
        return food.calories < 200;
    } else if (food.type === "vegetable") {
        return food.calories < 300;
    }
    return false;
}


const createFoodFactory = (type: string): CreateFunction => {
    if (type !== "meat" && type !== "fruit" && type !== "vegetable") {
        throw new Error(type + " is not allowed");
    }
    return (name, calories) => {
        return {
            name: name,
            type: type,
            calories: calories,
        };
    };
};

const showFood = (foods: Food[]) => {
    for (let food of foods) {
        if (isVegan(food)) {
            console.log(pc.green(food.name));
        } else {
            console.log(pc.red(food.name));
        }
    }
}

try {
    // createFoodFactory("poop");
    const createMeat = createFoodFactory("meat");
    const createFruit = createFoodFactory("fruit");
    const createVegetable = createFoodFactory("vegetable");
    
    const food : Food[] = [
        createMeat("steak", 100),
        createMeat("chicken", 70),
        createFruit("apple", 150),
        createVegetable("tomato", 200)
    ];

    console.log(all(food, isHealthy));
    console.log(all(food, isVegan));
    console.log(all(food, (food) => {
        return food.name.startsWith("s");
    }));

    showFood(food);

} catch (e : any) {
    console.log(e.message);
}