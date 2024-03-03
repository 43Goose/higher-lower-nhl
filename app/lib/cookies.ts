'use server'

import { cookies } from "next/headers"

/** Sets highscore cookie in users browser
 * @param score - Score to set in cookie
 */
export async function SetHighScoreCookie(score: number) {
    cookies().set('highscore', score.toString(), { secure: true });
}

/** Gets the HighScore cookie from user if present
 * @returns {number}    - High Score cookie value or 0 if not present
 */
export async function GetHighScoreCookie() {
    const hs = cookies().get('highscore');
    return hs?.value ? parseInt(hs.value) : 0;
}

/** Checks if user has High Score cookie
 * @returns {boolean}   - True if cookie exists
 */
export async function checkHighScoreCookie() {
    return cookies().has('highscore');
}

/** Sets a cookie when user accepts cookies to avoid asking again :) */
export async function cookiesAccepted() {
    cookies().set('acceptedHL', 'thanks', { secure: true });
}

/** Checks if user has accepted use of cookies
 * @returns {boolean}   - True if user has already accepted cookies
 */
export async function checkCookiesAccepted() {
    return cookies().has('acceptedHL');
}