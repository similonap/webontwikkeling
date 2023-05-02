import axios from 'axios';

interface Drink {
    strDrink: string;
}

const cocktailIds = [11000, 11001, 11002];

const getCocktailName = (id: number): Promise<string> => {
    return axios.get("https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=" + id).then(response => {
        const cocktail: Drink = response.data.drinks[0];
        return cocktail.strDrink;
    })
}

Promise.all(cocktailIds.map(id => getCocktailName(id))).then(res => {
    console.log(res.join('\n'));
});
