import chalk from 'chalk';
import Action from './action.js'
import dotenv from 'dotenv';
import DB from './db.js';
import inquirer from 'inquirer';
dotenv.config();

console.clear();

DB.createDB();

const okText = chalk.greenBright.bold;
const errText = chalk.redBright.bold;

const commands = [
    "list",
    "add",
    "delete",
    "delete-all",
    "edit",
    "export",
    "import",
    "download"
]

const answers = await inquirer.prompt([
    {
        type: "rawlist",
        name: "command",
        message: "Choose a command:",
        choices: ["list", "add", "delete", "delete-all", "edit", "export", "import", "download"],
        loop: false
    }
]);

if (answers.command) {
    if (commands.includes(answers.command)) {
        switch (answers.command) {
            case commands[0]:
                Action.list();
                break;
            case commands[1]:
                Action.add();
                break;
            case commands[2]:
                Action.delete();
                break;
            case commands[3]:
                Action.deleteAll();
                break;
            case commands[4]:
                Action.edit();
                break;
            case commands[5]:
                Action.export();
                break;
            case commands[6]:
                Action.import();
                break;
            case commands[7]:
                Action.download();
                break;
        }
    } else {
        console.log("unknown command");
    }
} else {
    console.log(`${errText("You must enter a command")}
List of available commands:
${okText(commands.join("\n"))}`);
}