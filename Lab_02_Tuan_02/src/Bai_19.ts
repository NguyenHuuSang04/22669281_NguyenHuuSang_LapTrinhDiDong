import { fetchUser } from "./Bai_18";
async function fetchUsers(ids: number[]): Promise<{ id: number, name: string }[]> {
    // cách 1: chạy song song 
    const users = await Promise.all(ids.map(id => fetchUser(id)));
    return users;

    // cách 2: chạy tuần tự
    // const users: { id: number; name: string }[] = [];
    // for (const id of ids) {
    //     const user = await fetchUser(id);
    //     users.push(user);
    // }
    // return users;
}

async function run_bai_19() {
    console.log("Fetching user...");
    const users = await fetchUsers([1, 2, 3, 4, 5]);
    console.log("User được fetch: ", users);
}

run_bai_19();