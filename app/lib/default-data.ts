export interface Player {
    id: number;
    name: string;
    stat: number;
    picture: string;
}

export const Players: Array<Player> = [
    {
        id: 1,
        name: 'Wayne Gretzky',
        stat: 2857,
        picture: 'a'
    },
    {
        id: 2,
        name: 'Connor Bedard',
        stat: 33,
        picture: 'b'
    },
    {
        id: 3,
        name: 'Quinn Hughes',
        stat: 303,
        picture: 'c'
    },
    {
        id: 4,
        name: 'Sidney Crosby',
        stat: 1552,
        picture: 'd'
    }
];