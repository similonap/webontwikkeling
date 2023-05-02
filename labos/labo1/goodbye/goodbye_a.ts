const languages = ["english", "french", "spanish", "german", "dutch", "italian"];


interface GetInLanguage {
    (language: string): string
}
const getGoodbyeInLanguage : GetInLanguage = (language = "english") => {
    if (language === "english") {
        return "Goodbye";
    } else if (language === "french") {
        return "Au revoir";
    } else if (language === "spanish") {
        return "Adiós";
    } else if (language === "german") {
        return "Auf Wiedersehen";
    } else if (language === "dutch") {
        return "Tot ziens";
    } else if (language === "italian") {
        return "Arrivederci";
    } else {
        return "Language not found";
    }
}

function getRandomLanguage(): string {
    return languages[Math.floor(Math.random() * languages.length)];
}

function sayGoodbye(name: string) {
    let goodbye = getGoodbyeInLanguage(getRandomLanguage());
    console.log(`${goodbye}, ${name}`);
}

function sayGoodbyeTimes(name: string, times: number) {
    for (let i = 0; i < times; i++) {
        sayGoodbye(name);
    }
}

sayGoodbyeTimes("Andie", 5);
