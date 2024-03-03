// Player type for game functions
export interface PlayerInterface {
    nhlID: string;
    name: string;
    points: number;
    goals: number;
    assists: number;
    playerImage: string;
}

// User type for login/logout functions
export interface UserInterface {
    username: string;
    password: string;
}