function calculate_Bai28(num: number): Promise<number> {
    return new Promise((resolve) => {
        resolve(num * 2);
    })
}

async function batchProcess() {
    const results = await Promise.all([
        calculate_Bai28(1),
        calculate_Bai28(2),
        calculate_Bai28(3),
        calculate_Bai28(4),
        calculate_Bai28(5),
    ])

    console.log(` Kết quả cuối cùng: `, results);
}

batchProcess();