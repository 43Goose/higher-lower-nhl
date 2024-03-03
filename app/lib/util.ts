/** Waits for given time
 * @param timeMS    - Time to wait in milliseconds
 */
export const waitForSeconds = (timeMS: number) => {
    /* returns promise after given time */
    return new Promise<void>((res, rej) => {
        setTimeout(() => {
            res();
        }, timeMS);
    });
}