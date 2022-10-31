import chalk from 'chalk';
import DB from "./db.js";
import dotenv from 'dotenv';
dotenv.config();

console.clear();

const okText = chalk.greenBright.bold;
const errText = chalk.redBright.bold;

try {
    if (DB.createDB()) {
        console.log(okText("DB created sucessfully"));
    } else {
        console.log(errText("DB already exists"));
    }
} catch (e) {
    console.log(errText(e.message));
}

console.log(DB.searchElementById(2));
console.log(DB.searchElementByTitle("book1"));
console.log(DB.allData());