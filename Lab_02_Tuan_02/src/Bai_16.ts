function bai_16(a: number): Promise<number> {
    return new Promise((resolve) => {
        resolve(a * 2);
    })
}

async function run_Bai_16() {
    // chayj song song 3 promise
    const results = await Promise.all([
        bai_16(1),
        bai_16(2),
        bai_16(3)
    ]);
    console.log("Results:", results);
}

run_Bai_16();