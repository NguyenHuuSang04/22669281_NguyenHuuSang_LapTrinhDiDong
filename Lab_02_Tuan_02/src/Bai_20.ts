import { fetchUser } from "./Bai_18";

async function fetchUser_Bai20(ids: number[]): Promise<{ id: number, name: string }[]> {
    const fetchPromise_bai20 = Promise.all(ids.map(id => fetchUser(id)));

    // tạo promise timeout 2s
    const timeoutPromise = new Promise<never>((_, reject) => {
        setTimeout(() => reject(new Error("Quá thời gian fetch")), 500);
    });

    // ai xong trước thì lấy kết quả cái đó
    return Promise.race([fetchPromise_bai20, timeoutPromise]);
}

async function run_bai_20() {
    try {
        console.log("Fetching user...");
        const users = await fetchUser_Bai20([1, 2, 3, 4, 5])
        console.log("User được fetch: ", users);
    } catch (error: any) {
        console.error("Lỗi", error.message);

    }

}

run_bai_20()