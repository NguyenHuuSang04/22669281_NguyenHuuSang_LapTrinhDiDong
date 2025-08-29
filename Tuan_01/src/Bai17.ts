// singleton: chỉ tạo duy nhất một instance của class trong suốt chương trình
class Logger {
    private static instance: Logger; // giữ instance duy nhất

    // private constructor để ngăn tạo trực tiếp bằng new
    private constructor() { }

    // method static để lấy ra instance duy nhất
    public static getInstance(): Logger { // nếu ch có instance thì tạo mới, có rồi thì trả về instance cũ
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    // log message ra console
    public log(message: string): void {
        console.log(`[LOG]: ${message}`);
    }
}

const logger_1 = Logger.getInstance();
const logger_2 = Logger.getInstance();

logger_1.log("Hello from logger_1!");
logger_2.log("Hello from logger_2!");

