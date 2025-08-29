"use strict";
// singleton: chỉ tạo duy nhất một instance của class trong suốt chương trình
class Logger {
    // private constructor để ngăn tạo trực tiếp bằng new
    constructor() { }
    // method static để lấy ra instance duy nhất
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    // log message ra console
    log(message) {
        console.log(`[LOG]: ${message}`);
    }
}
const logger_1 = Logger.getInstance();
const logger_2 = Logger.getInstance();
logger_1.log("Hello from logger_1!");
logger_2.log("Hello from logger_2!");
