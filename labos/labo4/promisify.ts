import fs from 'fs';
import util from 'util';

interface ReadFilePromise {
    (fileName: string): Promise<string>
}

// const readFilePromise : ReadFilePromise = (fileName) => {
//     return new Promise((resolve, reject) => {
//         fs.readFile(fileName, "utf8", (err, data) => {
//             if (err) {
//                 reject(err)
//             } else {
//                 resolve(data);
//             }
//         });
//     })
// }

const readFilePromise = util.promisify(fs.readFile);

// Immediately Invoked Function Expression (IIFE)
(async() => {
    
    let data = await readFilePromise("./blaaa.txt", "utf-8");
    console.log(data);
})();

