function wait(ms: number): Promise<void> {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    });
}

async function bai_26(fileName: string): Promise<void> {
    console.log(`Đang tải file: ${fileName}...`);

    await wait(5000);

    console.log(`Tải xong file: ${fileName}`);
}

// test
bai_26("video.mp4");