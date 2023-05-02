import { Tweet, Profile } from "./types";
import { MongoClient } from "mongodb";

const uri = "mongodb+srv://blabberbird:blabberbird@mijncluster.m7qox90.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);

const getTweets = async () => {
    let tweetsFromDb : Tweet[] = await client.db("blabberbird").collection("tweets").find<Tweet>({}).sort({createdOn: -1}).toArray();
    return tweetsFromDb;
}

const getTweetsByHandle = async (handle: string) => {
    let tweetsFromDb = await client.db("blabberbird").collection("tweets").find<Tweet>({handle: handle}).sort({createdOn: -1}).toArray();
    return tweetsFromDb;
}

const getProfileByHandle = async (handle: string) => {
    let tweetsFromDb = await client.db("blabberbird").collection("profiles").findOne<Tweet>({handle: handle});
    return tweetsFromDb;
}

const createTweet = async (tweet: Tweet) => {
    await client.db("blabberbird").collection("tweets").insertOne(tweet);
}

const exit = async () => {
    try {
        await client.close();
        process.exit(0);
    } catch (error) {
        console.error(error);
    }
}

const connect = async () => {
    const client = new MongoClient(uri);
    await client.connect();
    process.on('SIGINT', exit);
}

const loadData = async () => {
    let tweetsFromDb = await client.db("blabberbird").collection("tweets").find<Tweet>({}).toArray();
    if (tweetsFromDb.length == 0) {
        await client.db("blabberbird").collection("tweets").insertMany(require("./data").tweets);
    }
    let profilesFromDb = await client.db("blabberbird").collection("profiles").find<Profile>({}).toArray();
    if (profilesFromDb.length == 0) {
        await client.db("blabberbird").collection("profiles").insertMany(require("./data").profiles);
    }
}

const tweets: Tweet[] = [
    {
        name: "Cookie",
        handle: "Cookie",
        text: "Mrgglglglgl! Mrrlllrgglglglgl! Mrgglrglglglgl! 🐟🌲 #Mrgglglglgl",
        createdOn: new Date()
    },
    {
        name: "Thrall",
        handle: "WarchiefThrall",
        text: "Just got a new Doomhammer. It's so much lighter than the old one. #NewYearNewMe #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Jaina Proudmoore",
        handle: "ArchmageJaina",
        text: "Did you hear about the mage who always kept her polymorph spell up? She really had a sheep fetish! 🐑😂 @WarchiefThrall #WarcraftJokes #MageLife",
        createdOn: new Date()
    },
    {
        name: "Sylvanas Windrunner",
        handle: "BansheeQueen",
        text: "Just played a game of 'Hide and Seek' with my fellow undead. I won, of course, they couldn't smell me coming! 🧟‍♂️ #UndeadHumor #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Varian Wrynn",
        handle: "KingVarian",
        text: "I told Anduin not to play Hearthstone with @ArchmageJaina. He never listens! #Fatherhood #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Tyrande Whisperwind",
        handle: "HighPriestess",
        text: "A priest, a druid, and a rogue walk into a bar. The bartender says, 'What's this, a Night Elf party?' 😄 #NightElfJokes #Warcraft",
        createdOn: new Date()
        
    },
    {
        name: "Illidan Stormrage",
        handle: "TheBetrayed",
        text: "You are not prepared... for this joke! Why did the druid go to therapy? He had too many bear issues! 🐻 @HighPriestess #WarcraftJokes #YouAreNotPrepared",
        createdOn: new Date()
    },
    {
        name: "Arthas Menethil",
        handle: "TheLichKing",
        text: "Knock knock. Who's there? Frostmourne. Frostmourne who? Frostmourne hungers... for more jokes! 😈 #LichKingLaughs #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Anduin Wrynn",
        handle: "PrinceAnduin",
        text: "Just learned a new healing spell from @ArchmageJaina. I feel so powerful! 💪 #PriestLife #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Arthas Menethil",
        handle: "TheLichKing",
        text: "Just took a stroll around Icecrown Citadel. You could say it was... chilling. ❄️ #LichKingLife #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Arthas Menethil",
        handle: "TheLichKing",
        text: "Why did the Paladin fail his driving test? He couldn't stop using his Divine Shield! 😂 #PaladinJokes #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Arthas Menethil",
        handle: "TheLichKing",
        text: "I told Invincible to take a break today. Even undead horses need some rest! 💀🐎 #LichKingLife #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Thrall",
        handle: "WarchiefThrall",
        text: "Why did the Tauren bring string to the party? He wanted to have a good time and just couldn't... bear it without! 😂 #TaurenHumor #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Thrall",
        handle: "WarchiefThrall",
        text: "Had a great meeting with @HighPriestess today. The Horde and the Night Elves will work together for a better future! #Peace #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Thrall",
        handle: "WarchiefThrall",
        text: "Shaman Tip: When life gives you lemons, make a totem out of them! 🍋⚡ #ShamanWisdom #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Jaina Proudmoore",
        handle: "ArchmageJaina",
        text: "Why did the Frost Mage get a job at the ice cream shop? They had the perfect cone of cold! 🍦❄️ #MageHumor #Warcraft",
        createdOn: new Date()
    },
    {
        name: "Jaina Proudmoore",
        handle: "ArchmageJaina",
        text: "Had an insightful conversation with @KingVarian today. Let's bring peace to Azeroth, one step at a time! 🕊️ #PeaceTalks #Warcraft",
        createdOn: new Date()
    },
];

const profiles: Profile[] = [
    {
        handle: "Cookie",
        name: "Cookie",
        bio: "Adventurous murloc who loves exploring and making friends. Always up for a challenge! 🐟🌲"
    },
    {
        handle: "WarchiefThrall",
        name: "Thrall",
        bio: "Warchief of the Horde, powerful shaman, and protector of Azeroth. Working towards peace and unity. 🌩️🔨"
    },
    {
        handle: "ArchmageJaina",
        name: "Jaina Proudmoore",
        bio: "Leader of the Kirin Tor, powerful mage, and advocate for peace. Making Azeroth a better place, one spell at a time. ✨📚"
    },
    {
        handle: "BansheeQueen",
        name: "Sylvanas Windrunner",
        bio: "Banshee Queen of the Forsaken, master archer, and cunning strategist. Reclaiming what was lost. 🏹🧟‍♀️"
    },
    {
        handle: "KingVarian",
        name: "Varian Wrynn",
        bio: "King of Stormwind, skilled warrior, and loving father. Fighting for the Alliance and a brighter future. ⚔️👑"
    },
    {
        handle: "HighPriestess",
        name: "Tyrande Whisperwind",
        bio: "High Priestess of Elune, skilled huntress, and leader of the Night Elves. Guided by the light of Elune. 🌙🏹"
    },
    {
        handle: "TheBetrayed",
        name: "Illidan Stormrage",
        bio: "Demon hunter, master of the fel, and misunderstood hero. Fighting the Burning Legion to save Azeroth. 🔥🗡️"
    },
    {
        handle: "TheLichKing",
        name: "Arthas Menethil",
        bio: "The Lich King, ruler of the Scourge, and master of Icecrown Citadel. Bringing cold and darkness to Azeroth. ❄️👑"
    },
    {
        handle: "PrinceAnduin",
        name: "Anduin Wrynn",
        bio: "Prince of Stormwind, devoted priest, and aspiring leader. Learning from the best to protect Azeroth. 🙏📖"
    },
    { 
        handle: "JonDoe",
        name: "Jon Doe",
        bio: "Mysterious maverick, pun enthusiast, and part-time ninja 🕶️. On a quest to discover the world's best dad jokes and hidden emojis 🕵️. #AnonymousAdventurer"
    }
];

export { getTweets, getProfileByHandle, getTweetsByHandle,createTweet, connect, loadData };
