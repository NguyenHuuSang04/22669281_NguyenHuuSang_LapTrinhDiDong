async function fetchUsersFromAPI(): Promise<any[]> {
    try {
        const respone = await fetch("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/Users");

        if (!respone.ok) {
            throw new Error(`HTTP error! Status: ${respone.status}`);
        }

        const data = await respone.json();
        return data;
    } catch (error) {
        console.error("Lỗi khi fetch APT: ", error);
        return [];
    }
}

async function run_bai_21() {
    console.log("fetching users từ API...");
    const users = await fetchUsersFromAPI();
    console.log("Kết quả: ", users);
}

run_bai_21();