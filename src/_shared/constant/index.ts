
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

export const OPTIONS = [
    "Over 1.5 goals",
    "Over 2.5 goals",
    "Over 3.5 goals",
    "GG",
    "GG & over 2.5 goals",
    "Home win & Over 1.5 goals",
    "Away win & Over 1.5 goals",
    "Home win",
    "Away win",
    "Draw",
    "Home win & draw",
    "Away win % draw",
    "Over 7.5 Corners",
    "Over 8.5 Corners",
    "Over 9.5 Corners",
    "Over 10.5 Corners",
    "Under 3.5 goals",
    "Under 4.5 goals",
    "Home win to nil, No",
    "Away win to nil, No",
    "Home win or GG",
    "Away win & GG",
    "Home win & GG",
    "Away win & GG",
    "HT over 0.5 goals",
    "HT over 1.5 goals",
    "HT under 2.5 goals",
    "2nd HT over 0.5 goals",
    "2nd HT over 1.5 goals",
    "2nd HT under 2.5 goals",
    "Home over 0.5 goals",
    "Away over 0.5 goals",
    "Home over 1.5 goals",
    "Away over 1.5 goals",
    "Home over 2.5 goals",
    "Away over 2.5 goals",
    "Home HT goal over 0.5 goals",
    "Away HT goal over 0.5 goals",
    "Home HT goal over 1.5 goals",
    "Away HT goal over 1.5 goals",
    "Home DNB",
    "Away DNB",
    "2nd HS",
    "Both halves over 1.5 goals",
    "Both halves under 1.5 goals",
    "Home to score both halves",
    "Away to score both halves",
    "Home to win both halves",
    "Away to win both halves",
    "Home win HT/FT",
    "Away win HT/FT",
    "Home win HT&FT",
    "Away win HT&FT",
    "1st Half - Multigoals: 1-3 goals",
    "Number of goals - First Half: 3+ goals"
]
