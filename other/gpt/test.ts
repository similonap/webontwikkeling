const { green, red } = require("picocolors");

interface Car {
  name: string;
  year: number;
  type: string;
}

interface CreateFunction {
  (name: string, year: number): Car;
}

const createCarFactory = (type: string): CreateFunction => {
  const allowedTypes = ["sport", "family", "luxury"];
  if (!allowedTypes.includes(type)) {
    throw new Error("Invalid car type!");
  }

  return (name: string, year: number): Car => {
    return {
      name,
      year,
      type,
    };
  };
};

const createSport = createCarFactory("sport");
const createFamily = createCarFactory("family");
const createLuxury = createCarFactory("luxury");

interface TestFunction {
  (car: Car): boolean;
}

const isLuxury: TestFunction = (car: Car): boolean => {
  return car.type === "luxury";
};

const isOld: TestFunction = (car: Car): boolean => {
  switch (car.type) {
    case "sport":
      return car.year <= 2011;
    case "family":
      return car.year <= 2014;
    case "luxury":
      return car.year <= 2016;
    default:
      throw new Error("Invalid car type!");
    }
  };
  
  const cars: Car[] = [
    createSport("Ferrari", 2010),
    createSport("Porsche", 2015),
    createSport("Lamborghini", 2018),
    createFamily("Ford", 2012),
    createFamily("Toyota", 2016),
    createFamily("Honda", 2018),
    createLuxury("Mercedes", 2014),
    createLuxury("BMW", 2017),
    createLuxury("Audi", 2019),
    createLuxury("Lexus", 2020),
  ];
  
  const none = (arr: Car[], test: TestFunction): boolean => {
    for (const car of arr) {
      if (test(car)) {
        return false;
      }
    }
    return true;
  };
  
  
  const showCars = (arr: Car[]): void => {
    for (const car of arr) {
      const color = isOld(car) ? red : green;
      console.log(color(car.name));
    }
  };
  
  console.log(none(cars, isLuxury)); // false
  console.log(none(cars, isOld)); // false

  showCars(cars); // displays names of cars in green or red depending on their age