import chalk from 'chalk';
import DB from "./db.js";
import dotenv from 'dotenv';
dotenv.config();

console.clear();

const okText = chalk.greenBright.bold;
const errText = chalk.redBright.bold;

// try {
//     if (DB.createDB()) {
//         console.log(okText("DB created sucessfully"));
//     } else {
//         console.log(errText("DB already exists"));
//     }
// } catch (e) {
//     console.log(errText(e.message));
// }

// try {
//     console.log(DB.searchElementById(2));
//     console.log(DB.searchElementByTitle("book1"));
//     console.log(DB.allData());
// } catch (e) {
//     console.log(e.message);
// }

// try {
//     DB.addTask("book6", false);
// } catch (e) {
//     console.log(e.message);
// }

// try {
//     console.log(DB.editTask(4, "book5", true));
// } catch (e) {
//     console.log(e.message);
// }

// try {
//     console.log(DB.deleteTaskById(4));
// } catch (e) {
//     console.log(errText(e.message));
// }

// try {
//     DB.importData("[{\"id\": 1, \"title\": \"book1\",   \"completed\": true}, {\"id\": 2,\"title\": \"book2\",\"completed\": false}]");
// } catch (e) {
//     console.log(errText(e.message));
// }