async function postDataUser(url: string, data: any): Promise<any> {
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // gửi json
            },
            body: JSON.stringify(data), // chuyển object thành chuỗi json
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Kết quả từ serve: ", result);
        return result;
    } catch (error) {
        console.error("Lỗi khi POST: ", error);
    }
}
// test thử với API
async function run_bai_24() {
    const apiURL = "https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/Users";
    const newUser = {
        title: "Test post API",
        name: "Sang",
        address: "Go Vap, Tp Ho Chi Minh",
    };
    await postDataUser(apiURL, newUser);
}
run_bai_24();