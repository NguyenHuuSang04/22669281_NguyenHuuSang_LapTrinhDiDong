function downloadFile(fileName: string): void {
    console.log(`Đang tải file: ${fileName}...`);

    setTimeout(() => {
        console.log(`Tải xong file: ${fileName}`);
    }, 3000);
}

downloadFile("baocao.pdf");