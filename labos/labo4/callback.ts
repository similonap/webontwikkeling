interface Food {
    name: string;
}

interface FoodReadyCallback {
    (food: Food): void;
}

const wait = (ms: number): Promise<void> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(), ms);
    });
}

const makeMashedPotatoes = async (food: Food) => {
        console.log("Peeling potatoes");
        food.name = "peeled potatoes";
        await wait(1000);
        console.log("Cutting potatoes");
        food.name = "cut potatoes";
        await wait(1000);
        console.log("Boiling potatoes");
        food.name = "boiled potatoes";
        await wait(1000);
        console.log("Mashing potatoes");
        food.name = "mashed potatoes";
        return food;
}


(async() => {
    let food = await makeMashedPotatoes({ name: "potatoes" });
    console.log("Food is ready: " + food.name);
})();