'use server'

import { cookies } from "next/headers"

export async function SetHighScoreCookie(score: number) {
    cookies().set('highscore', score.toString(), { secure: true });
}

export async function GetHighScoreCookie() {
    const hs = cookies().get('highscore');
    return hs?.value ? parseInt(hs.value) : 0;
}

export async function checkHighScoreCookie() {
    return cookies().has('highscore');
}

export async function cookiesAccepted() {
    cookies().set('acceptedHL', 'thanks', { secure: true });
}

export async function checkCookiesAccepted() {
    return cookies().has('acceptedHL');  
}