export interface Player {
    id: number;
    name: string;
    points: number;
    goals: number;
    assists: number;
    playerImage: string;
}

export const Players: Array<Player> = [
    {
        id: 1,
        name: 'Wayne Gretzky',
        points: 2857,
        goals: 1,
        assists: 1,
        playerImage: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2021-10/edmonton-wayne-gretzky-031516-getty-ftrjpg_btjzlzxrrpec1covu0vtbck2u.jpg?itok=vt2oho_f'
    },
    {
        id: 2,
        name: 'Connor Bedard',
        points: 33,
        goals: 1,
        assists: 1,
        playerImage: 'https://www.kget.com/wp-content/uploads/sites/2/2023/10/65247b8d002598.17427301.jpeg'
    },
    {
        id: 3,
        name: 'Quinn Hughes',
        points: 303,
        goals: 1,
        assists: 1,
        playerImage: 'https://thehockeynews.com/.image/t_share/MjAxNzIzNjA2MTYwMzg1ODEy/usatsi_21627816.jpg'
    },
    {
        id: 4,
        name: 'Sidney Crosby',
        points: 1552,
        goals: 1,
        assists: 1,
        playerImage: 'https://cdn.nhlpa.com/img/assets/nhlpa.com/gallery/23310C7C-E31E-4EF8-901F-E7C78A24E7A5/CP-Crosby.jpg'
    }
];