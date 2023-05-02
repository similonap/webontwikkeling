const readline = require('readline');
  
const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('What is your name?', (answer: string) => {
    rl.question('What is your age?', (age: string) => {
        
        console.log("Hello " + answer + " you are " + age + " years old.");


        rl.close();
    });
});
