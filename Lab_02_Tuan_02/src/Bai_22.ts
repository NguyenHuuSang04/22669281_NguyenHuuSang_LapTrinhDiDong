import { fetchUsersFromAPI } from "./Bai_21";

async function runMultipleCalls() {
    console.log("Bắt đầu gọi API nhiều lần");

    for (let i = 0; i <= 3; i++) {
        console.log(`\n Lần gọi thứ ${i}`);
        const users = await fetchUsersFromAPI();
        console.log(users);
    }

}

runMultipleCalls();