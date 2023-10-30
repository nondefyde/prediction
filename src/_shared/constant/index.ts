
export const GET = 'GET';
export const POST = 'POST';
export const PUT = 'PUT';
export const PATCH = 'PATCH';
export const DELETE = 'DELETE';

/** url **/
export const teamsUrl = '/teams';
export const fixturesUrl = '/fixtures';



export const API_KEY = process.env.NEXT_PUBLIC_API_KEY as string;
export const APP_BASE_URL = process.env.NEXT_PUBLIC_APP_BASE_URL as string;


export const OUTCOMES = ['Home win', 'Home win or draw', 'Draw', 'Away win', 'Away win or draw', 'Over 1.5']