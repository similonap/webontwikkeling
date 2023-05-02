interface Container {
    label: string;
    maxCapacity: number;
    currentLevel: number;
    fluidType: string;
}

const createContainer = (label: string, beginLevel: number, maxCapacity: number, fluidType: string): Container => {
    let newContainer : Container = {
        label: label,
        maxCapacity: maxCapacity,
        currentLevel: 0,
        fluidType: fluidType
    }
    if (maxCapacity < 0) throw new Error("Max capacity must be positive");
    fillContainer(newContainer, beginLevel, fluidType);
    return newContainer;
}

const fillContainer = (container: Container, amount: number, fluidType: string) => {
    if (amount < 0) throw new Error("Container level must be positive");
    if (fluidType !== "RED" && fluidType !== "GREEN" && fluidType !== "BLUE") throw new Error("Invalid fluid type");
    if (container.fluidType === fluidType) {
        if (container.currentLevel + amount > container.maxCapacity) {
            throw new Error("Container overflow");
        } else {
            container.currentLevel = Math.min(container.maxCapacity, container.currentLevel + amount);
        }
    } else {
        throw new Error("This container does not allow this type of fluid");
    }
}

const emptyContainer = (container: Container, amount: number) => {
    if (amount < 0) throw new Error("Amount must be positive");
    if (container.currentLevel - amount < 0) {
        throw new Error("Container underflow");
    } else {
        container.currentLevel = Math.max(0, container.currentLevel - amount);
    }
}

const printContainer = (container: Container) => {
    console.log(`Container ${container.label} contains ${container.currentLevel} units of ${container.fluidType.toLocaleLowerCase()} fluid (max capacity: ${container.maxCapacity}))`);
}

const printAllContainers = (containers: Container[]) => {
    containers.forEach(printContainer);
}


