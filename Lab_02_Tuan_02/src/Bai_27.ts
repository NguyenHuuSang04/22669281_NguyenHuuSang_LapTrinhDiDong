async function fetchWithRetry(url: string, retries: number): Promise<any> {
    for (let i = 1; i <= retries; i++) {
        try {
            console.log(` Số lần ${i}...`);
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Success: ", data);
            return data;
        } catch (error) {
            console.error(`Error ở lần ${i}: `, error);

            if (i = retries) {
                throw new Error(`Đã thất bại sau ${retries} lần`);
            }

            // thêm delay trước khi thử lại
            await new Promise((res) => setTimeout(res, 1000));
        }
    }
}
fetchWithRetry("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/todoList", 3)
    .then(data => console.log("Kết quả cuối sau khi fetch API: ", data))
    .catch(err => console.error("Gọi API thất bại: ", err.message));