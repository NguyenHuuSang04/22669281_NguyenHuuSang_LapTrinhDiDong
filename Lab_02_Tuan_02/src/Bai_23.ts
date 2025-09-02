async function fetchTodosFromAPI(): Promise<any[]> {
    try {
        const respone = await fetch("https://6832d64fc3f2222a8cb3da6f.mockapi.io/api/v1/todoList");
        if (!respone.ok) {
            throw new Error(`HTTP error! Status: ${respone.status}`);
        }
        const data = await respone.json();
        const dataFilte = data.filter((todo: any) => todo.status === true);
        return dataFilte;

    } catch (error) {
        console.log("Có lỗi khi fetch todo", error);
        return [];
    }
}

async function run_bai_22() {
    const todos = await fetchTodosFromAPI();
    console.log("Danh sách việc đã hoàn thành", todos);

}

run_bai_22();