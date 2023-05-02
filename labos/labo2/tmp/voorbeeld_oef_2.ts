// In deze opdracht is het de bedoeling om een aantal getallen aan de gebruiker te vragen en deze in een array op te slaan. Als de gebruiker klaar is met invoeren van de getallen moet deze gevalideerd worden volgens de volgende regels:
// - De array mag niet leeg zijn. Als de array leeg is moet er een exception geworpen worden met de error message "Array must contain at least one number"
// - Alle getallen in de array moeten groter zijn dan 0. Als er een getal kleiner of gelijk aan 0 in de array zit moet er een exception geworpen worden met de error message "Array must contain only positive numbers"
// - Alle getallen in de array moeten uniek zijn. Als er een getal dubbel in de array zit moet er een exception geworpen worden met de error message "Array must contain only unique numbers"
// - Alle elementen van de array moeten getallen zijn. Als er een element in de array zit dat geen getal is moet er een exception geworpen worden met de error message "Array must contain only numbers"
// - De getallen moeten in oplopende volgorde staan. Als de getallen niet in oplopende volgorde staan moet er een exception geworpen worden met de error message "Array must contain numbers in ascending order"

// Als de array voldoet aan alle regels moet er op het scherm worden weergegeven "Array is valid.".

const readline = require('readline-sync');

const validateArray = (array: string[]): void => {
    if (array.length === 0) throw new Error("Array must contain at least one number");
    if (array.some((element) => parseInt(element) <= 0)) throw new Error("Array must contain only positive numbers");
    if (array.some((element, index) => array.indexOf(element) !== index)) throw new Error("Array must contain only unique numbers");
    if (array.some((element) => isNaN(parseInt(element)))) throw new Error("Array must contain only numbers");
    if (array.some((element, index) => index !== 0 && parseInt(element) <= parseInt(array[index - 1]))) throw new Error("Array must contain numbers in ascending order");
    console.log("Array is valid.");
}


while (true) {
    try {
        let array: string[] = [];
        while (true) {
            let input: string = readline.question("Enter a number: ");
            if (input === "") break;
            array.push(input);
        }
        validateArray(array);
        break;
    } catch (e: any) {
        console.log(e.message);   
        console.log("Try again!");
    }
}

export {}