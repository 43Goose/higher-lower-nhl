export interface Player {
    id: number;
    name: string;
    points: number;
    goals: number;
    assists: number;
    playerImage: string;
}

export interface PlayerSkeleton {
    id: number | undefined;
    name: string | undefined;
    points: number | undefined;
    goals: number | undefined;
    assists: number | undefined;
    playerImage: string | undefined;
}

export const addPlayer = (p: Player) => {
    Players.push(p);
    console.log(`Added: ${p.name}`);
}

export const updatePlayer = (newInfo: PlayerSkeleton, playerName: string) => {
    const oldPlayer = Players.find(p => p.name == playerName)
    if(oldPlayer != null) {
        const playerIndex = Players.findIndex(p => p.name);
        for(const [k, v] of Object.entries(newInfo)) {
            if(v != undefined) {
                switch (k) {
                    case 'name':
                        Players[playerIndex].name = v;
                        break;

                    case 'points':
                        Players[playerIndex].points = v;
                        break;

                    case 'goals':
                        Players[playerIndex].goals = v;
                        break;

                    case 'assists':
                        Players[playerIndex].assists = v;
                        break;

                    case 'playerImage':
                        Players[playerIndex].playerImage = v;
                        break;
                
                    default:
                        break;
                }
            }
        }
    } else {
        console.log("player doesn't exist");
    }
    
}

export const Players: Array<Player> = [
    {
        id: 1,
        name: 'Nils Hoglander',
        points: 76,
        goals: 42,
        assists: 34,
        playerImage: 'https://s3951.pcdn.co/wp-content/uploads/2022/03/Nils-Hoglander-Canucks.jpg'
    },
    {
        id: 2,
        name: 'Connor Bedard',
        points: 33,
        goals: 15,
        assists: 18,
        playerImage: 'https://www.kget.com/wp-content/uploads/sites/2/2023/10/65247b8d002598.17427301.jpeg'
    },
    {
        id: 3,
        name: 'Quinn Hughes',
        points: 306,
        goals: 38,
        assists: 268,
        playerImage: 'https://thehockeynews.com/.image/t_share/MjAxNzIzNjA2MTYwMzg1ODEy/usatsi_21627816.jpg'
    },
    {
        id: 4,
        name: 'Sidney Crosby',
        points: 1554,
        goals: 578,
        assists: 976,
        playerImage: 'https://cdn.nhlpa.com/img/assets/nhlpa.com/gallery/23310C7C-E31E-4EF8-901F-E7C78A24E7A5/CP-Crosby.jpg'
    },
    {
        id: 5,
        name: 'Alex Ovechkin',
        points: 1521,
        goals: 835,
        assists: 686,
        playerImage: 'https://dims.apnews.com/dims4/default/90e7d56/2147483647/strip/true/crop/5000x2813+0+0/resize/599x337!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F52%2F73%2F7a57dd899cdd34efaa8926580540%2Fd790ec343ae545a9aa0a0818f3b79f88'
    },
    {
        id: 6,
        name: 'Connor Mcdavid',
        points: 921,
        goals: 324,
        assists: 597,
        playerImage: 'https://oilersnation.com/_next/image?url=https%3A%2F%2Fpublish.oilersnation.com%2Fwp-content%2Fuploads%2F2023%2F02%2FUSATSI_20105394_168383996_lowres.jpg&w=3840&q=75'
    },
    {
        id: 7,
        name: 'Nikita Kucherov',
        points: 818,
        goals: 309,
        assists: 509,
        playerImage: 'https://www.sportsnet.ca/wp-content/uploads/2022/06/Tampa-Bay-Lightning-right-wing-Nikita-Kucherov-Cup-Final-1040x572.jpg'
    },
    {
        id: 8,
        name: 'Nathan Mackinnon',
        points: 844,
        goals: 316,
        assists: 528,
        playerImage: 'https://library.sportingnews.com/styles/crop_style_16_9_desktop/s3/2023-05/Nathan%20MacKinnon%20050123.jpg?h=920929c4&itok=n_FTaXtd'
    },
    {
        id: 9,
        name: 'Cale Makar',
        points: 306,
        goals: 78,
        assists: 228,
        playerImage: 'https://bdc2020.o0bc.com/wp-content/uploads/2021/07/NHL_Draft_Hockey_92820-60fc2efc912d5-scaled.jpg'
    },
    {
        id: 10,
        name: 'Elias Petterson',
        points: 392,
        goals: 164,
        assists: 228,
        playerImage: 'https://canucksarmy.com/_next/image?url=https%3A%2F%2Fpublish.canucksarmy.com%2Fwp-content%2Fuploads%2Fsites%2F3%2F2023%2F11%2FUSATSI_21893405_168383996_lowres.jpg&w=3840&q=75'
    },
];