export const waitForSeconds = (timeMS: number) => {
    /* returns promise after given time */
    return new Promise<void>((res, rej) => {
        setTimeout(() => {
            res();
        }, timeMS);
    });
}