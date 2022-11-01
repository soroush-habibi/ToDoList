import chalk from 'chalk';
// import DB from "./db.js";
import Task from './task.js'
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
//     console.log(DB.editTask(2, "book2", true));
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

// const task1 = new Task("task1", true);
// console.log(task1);
// task1.save();
// console.log(task1);
// task1.title = "task2";
// task1.completed = false;
// task1.save();
// console.log(task1);
// task1.completed = true;
// task1.save();
// console.log(task1);

// const task1 = Task.searchElementById(2);
// console.log(task1);
// task1.title = "Learn Node.Js";
// task1.save();
// console.log(task1);