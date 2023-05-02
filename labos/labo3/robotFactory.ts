const chalk = require("chalk");

interface CreateFunction {
    (name: string): void
}

const createRobotFactory = (color: string) : CreateFunction => {
    return (name) => {
        console.log(chalk[color]("Robot " + name + " ready for duty!"));
    }
}

let createYellow = createRobotFactory("yellow");

createYellow("Roby");
createYellow("Eve");

let createRed = createRobotFactory("red");

createRed("Megatron");