import fs from 'fs';

export default class DB {
    static existsDB() {
        if (fs.existsSync(process.env.DB_FILE)) {
            return true;
        } else {
            return false;
        }
    }
    static createDB() {
        if (this.existsDB()) {
            return false;
        } else {
            try {
                fs.writeFileSync(process.env.DB_FILE, "[]");
                return true;
            } catch (e) {
                throw new Error("Can't create DB file");
            }
        }
    }
    static resetDB() {
        try {
            fs.writeFileSync(process.env.DB_FILE, "[]");
        } catch (e) {
            throw new Error("can't reset this file");
        }
    }
    static searchElementById(i) {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(process.env.DB_FILE, "utf-8"));
        } catch (e) {
            throw new Error("Can't Read or Parse data from DB file");
        }

        const result = data.find((each) => {
            if (Number(each.id) === Number(i)) {
                return true;
            }
        });

        if (result) {
            return result;
        } else {
            return false;
        }
    }
    static searchElementByTitle(i) {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(process.env.DB_FILE, "utf-8"));
        } catch (e) {
            throw new Error("Can't Read or Parse data from DB file");
        }

        const result = data.find((each) => {
            if (each.title === i) {
                return true;
            }
        });

        if (result) {
            return result;
        } else {
            return false;
        }
    }
    static allData() {
        let data = [];
        try {
            data = JSON.parse(fs.readFileSync(process.env.DB_FILE, "utf-8"));
        } catch (e) {
            throw new Error("Can't Read or Parse data from DB file");
        }
        return data;
    }
}