interface Task {
    (): void
}

const delay = (task: Task) => {
    setTimeout(() => {
        console.log("First I will watch TV!");
        setTimeout(() => {
            console.log("Then take a nap!");
            setTimeout(() => {
                task();
            }, 2000)
        },1000);
    }, 1000);
    
    // task();
}

const doHomeWork : Task = () => {
    console.log("I will do my homework");
}

const cleanDishes : Task = () => {
    console.log("I will clean the dishes");
}

delay(cleanDishes);
