import Task from "./task.js";
import DB from "./db.js";
import inquirer from "inquirer";
import chalk from "chalk";
import { stringify, parse } from "csv";
import fs, { write } from 'fs';
import axios from 'axios';

const warn = chalk.yellowBright.bold;
const success = chalk.greenBright.bold;

export default class Action {
    static list() {
        const data = Task.allData(true);
        if (data.length) {
            console.table(data);
        } else {
            console.log(warn("Database is empty"));
        }
    }

    static async add() {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Please enter your task title:"
            }, {
                type: "confirm",
                name: "completed",
                message: "Your task have been completed?",
                default: false
            }, {
                type: "confirm",
                name: "confirmation",
                message: "Are you sure?",
                default: true
            }
        ]);

        if (answer.confirmation) {
            try {
                const task = new Task(answer.title, answer.completed);
                task.save();
                console.log(success("Your task added successfully"));
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log(warn("Canceled"));
        }
    }

    static async delete() {
        const data = Task.allData();
        const titles = [];

        for (let item of data) {
            titles.push(item.title);
        }

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "title",
                message: "choose a task to delete:",
                choices: titles
            }, {
                type: "confirm",
                name: "confirmation",
                message: "Are you sure?",
                default: false
            }
        ]);

        if (answer.confirmation) {
            try {
                const task = Task.searchElementByTitle(answer.title);
                DB.deleteTaskById(Number(task.id));
                console.log(success("Task deleted successfully"));
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log(warn("Canceled"));
        }

    }

    static async deleteAll() {
        const answer = await inquirer.prompt([
            {
                type: "confirm",
                name: "confirmation",
                message: "Are you sure?",
                default: false
            }
        ]);

        if (answer.confirmation) {
            try {
                DB.resetDB();
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log(warn("Canceled"));
        }
    }

    static async edit() {
        const data = Task.allData();
        const titles = [];

        for (let item of data) {
            titles.push(item.title);
        }

        const answer = await inquirer.prompt([
            {
                type: "list",
                name: "title",
                message: "choose a task to edit:",
                choices: titles
            }
        ]);

        const answer2 = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Enter new title:",
                default: answer.title
            }, {
                type: "confirm",
                name: "completed",
                message: "Your task have been completed?",
                default: false
            }, {
                type: "confirm",
                name: "confirmation",
                message: "Are you sure?",
                default: true
            }
        ]);

        if (answer2.confirmation) {
            try {
                const task = Task.searchElementByTitle(answer.title);
                task.title = answer2.title;
                task.completed = answer2.completed;
                task.save();
                console.log(success("Task edited successfully"));
            } catch (e) {
                console.log(e.message);
            }
        } else {
            console.log(warn("Canceled"));
        }
    }

    static export() {
        try {
            const data = Task.allData(true, true);
            const writable = fs.createWriteStream('./output.csv');
            stringify(data, { header: true }, (err, result) => {
                if (!err) {
                    writable.write(result);
                    writable.end();
                } else {
                    console.log(err.message);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    static async import() {

        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "filename",
                message: "Enter a filename to import:"
            }
        ]);

        try {
            const inputfile = fs.readFileSync(answer.filename, "utf-8");
            parse(inputfile, { columns: true }, (err, result) => {
                if (!err) {
                    for (let item of result) {
                        item.id = Number(item.id);
                        if (item.completed === 'true') {
                            item.completed = true;
                        } else {
                            item.completed = false;
                        }
                    }
                    fs.writeFileSync("./db.json", JSON.stringify(result));
                } else {
                    console.log(err.message);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }

    static async download() {
        const answer = await inquirer.prompt([
            {
                type: "input",
                name: "url",
                message: "Enter full url of your csv file:",
            }
        ]);

        const config = {
            url: answer.url,
            method: "get"
        }

        try {
            const result = await axios(config);
            parse(result.data, { columns: true }, (err, result) => {
                if (!err) {
                    for (let item of result) {
                        item.id = Number(item.id);
                        if (item.completed === 'true') {
                            item.completed = true;
                        } else {
                            item.completed = false;
                        }
                    }
                    fs.writeFileSync("./db.json", JSON.stringify(result));
                    this.list();
                } else {
                    console.log(err.message);
                }
            });
        } catch (e) {
            console.log(e.message);
        }
    }
}