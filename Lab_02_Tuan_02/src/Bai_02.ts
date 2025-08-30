function get10AfterOneSecond(): Promise<number> {
    return new Promise(resolve =>
        setTimeout(resolve, 1000, 10));

}

get10AfterOneSecond().then(result => {
    console.log(result);
})