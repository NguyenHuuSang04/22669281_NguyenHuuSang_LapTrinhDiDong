function randomNumber(): Promise<string> {
    return new Promise((resolve, reject) => {
        let a = Math.random() * 100;
        setTimeout(() => {
            if (a) resolve(`Số random: ${a} > 10`);
            else reject(`Số random: ${a} < 10`);
        }, 1000);
    });
}


randomNumber()
    .then((result) => {
        console.log("Thành công; ", result);

    }).catch((err) => {
        console.log("Thất bại; ", err);
    });