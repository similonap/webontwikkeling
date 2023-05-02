import { MongoClient, ObjectId } from "mongodb";

const uri = "mongodb+srv://webontwikkeling:webontwikkeling@cluster0.3xtspln.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(uri);

interface Game {
    _id?: ObjectId,
    name: string;
    price: number;
    releaseDate: Date;
    rating: number;
    publisher: string;
}

const gamesArray: Game[] = [
    {
        name: 'The Witcher 3: Wild Hunt',
        price: 39.99,
        releaseDate: new Date('2015-05-19'),
        rating: 9.3,
        publisher: 'CD Projekt',
    },
    {
        name: 'Red Dead Redemption 2',
        price: 59.99,
        releaseDate: new Date('2018-10-26'),
        rating: 9.7,
        publisher: 'Rockstar Games',
    },
    {
        name: 'The Legend of Zelda: Breath of the Wild',
        price: 59.99,
        releaseDate: new Date('2017-03-03'),
        rating: 9.6,
        publisher: 'Nintendo',
    },
    {
        name: 'The Elder Scrolls V: Skyrim',
        price: 39.99,
        releaseDate: new Date('2011-11-11'),
        rating: 9.5,
        publisher: 'Bethesda Softworks',
    },
    {
        name: 'The Last of Us Part II',
        price: 59.99,
        releaseDate: new Date('2020-06-19'),
        rating: 9.2,
        publisher: 'Sony Interactive Entertainment',
    },
    {
        name: 'God of War',
        price: 39.99,
        releaseDate: new Date('2018-04-20'),
        rating: 9.4,
        publisher: 'Sony Interactive Entertainment',
    },
    {
        name: 'Dark Souls III',
        price: 59.99,
        releaseDate: new Date('2016-04-12'),
        rating: 9.1,
        publisher: 'FromSoftware',
    },
    {
        name: 'Grand Theft Auto V',
        price: 29.99,
        releaseDate: new Date('2013-09-17'),
        rating: 9.8,
        publisher: 'Rockstar Games',
    },
];

const showAllGames = async (sort: string) => {
    const games = await client.db("labo8").collection("games").find<Game>({}).sort({[sort]: -1}).toArray();
    console.table(games, ["name","price","releaseDate","rating"]);
}

const showGamesCheaperThan = async (price: number) => {
    const games = await client.db("labo8").collection("games").find<Game>({price: {$lt: price}}).toArray();
    console.table(games, ["name","price","releaseDate","rating"]);
}

const showHighestRatedGame = async () => {
    const games = await client.db("labo8").collection("games").find<Game>({}).sort({rating: -1}).limit(1).toArray();
    console.table(games, ["name","price","releaseDate","rating"]);
}

const showGamesWithPriceBetween = async (min: number, max: number) => {
    const games = await client.db("labo8").collection("games").find<Game>({$and: [
        {price: {$gt: min}},
        {price: {$lt: max}}
    ]}).toArray();
    console.table(games, ["name","price","releaseDate","rating"]);
}

const discountGames = async (discount: number) => {
    const games = await client.db("labo8").collection("games").find<Game>({}).toArray();
    for (let game of games) {
        game.price = Math.round((game.price * (100 - discount) / 100)*100)/100;
        await client.db("labo8").collection("games").updateOne({_id: game._id}, {$set: {price: game.price}});
    }
}


const deleteAllGames = async () => {
    await client.db("labo8").collection("games").deleteMany({});
}

const main = async() => {
    try {
        let connection = await client.connect();


        // await connection.close();

        // let games = await client.db("labo8").collection("games").find<Game>({}).toArray();

        // console.log(games.length);
        // if (games.length == 0) {
        //     await client.db("labo8").collection("games").insertMany(gamesArray);
        // }

        // await showAllGames("name");
        // await showGamesCheaperThan(40);
        // await showHighestRatedGame();

        // await showGamesWithPriceBetween(30, 40);

        // await discountGames(10);

        // await showAllGames("price");

        // await deleteAllGames();
  
    } catch (e) {
        console.log(e);
    } finally { 
        // client.close();
    }
    

};

main();