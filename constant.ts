import { PublicKey } from '@solana/web3.js'
import { Team } from './types/sharedtypes'

export const groups: string[] = ['A', 'B', 'C', 'D', 'E', 'F']
export const MAX_TEAMS_IN_GROUP = 4
export const THIRDPLACE_MATHCOUNT = 6
export const THIRD_PLACE_STANDING = 3
export const ROUND16_MATCHCOUNT = 8
export const KNOCKOUT_MATCHCOUNT = 4
export const SEMIS_MATCHCOUNT = 2
export const FINALS_MATCHCOUNT = 1
export const ROUND16_STARTMATCH_NUM = 37
export const WINNER = 0
export const RUNNERUP = 1
export const THIRDPLACED = 2
export const FOURTHPLACE = 3

export const QUARTERS_STARTMATCH_NUM = 45
export const SEMIS_STARTMATCH_NUM = 49
export const FINALS_STARTMATCH_NUM = 51
export const rpcEndPointUrl =
    'https://mainnet.helius-rpc.com/?api-key=6232281d-74e4-4046-af05-ab63e2360f2a'

export const ROUND16_FIXTURE_RULES = [
    {
        firstTeam: {
            group: 'A',
            position: WINNER,
        },
        secondTeam: {
            group: 'C',
            position: RUNNERUP,
        },
    },
    {
        firstTeam: {
            group: 'A',
            position: RUNNERUP,
        },
        secondTeam: {
            group: 'B',
            position: RUNNERUP,
        },
    },
    {
        firstTeam: {
            group: 'B',
            position: WINNER,
        },
        secondTeam: {
            group: false,
            thirdPlaceRanked: true,
            position: WINNER,
        },
    },
    {
        firstTeam: {
            group: 'C',
            position: WINNER,
        },
        secondTeam: {
            group: false,
            thirdPlaceRanked: true,
            position: FOURTHPLACE,
        },
    },
    {
        firstTeam: {
            group: 'F',
            position: WINNER,
        },
        secondTeam: {
            group: false,
            thirdPlaceRanked: true,
            position: THIRDPLACED,
        },
    },
    {
        firstTeam: {
            group: 'D',
            position: RUNNERUP,
        },
        secondTeam: {
            group: 'E',
            position: RUNNERUP,
        },
    },
    {
        firstTeam: {
            group: 'E',
            position: WINNER,
        },
        secondTeam: {
            group: false,
            thirdPlaceRanked: true,
            position: RUNNERUP,
        },
    },
    {
        firstTeam: {
            group: 'D',
            position: WINNER,
        },
        secondTeam: {
            group: 'F',
            position: RUNNERUP,
        },
    },
]

export const QUARTERFINALS_FIXTURE_RULES = [
    {
        firstTeam: {
            group: false,
            quarters: true,
            match: 37,
        },
        secondTeam: {
            group: false,
            quarters: true,
            match: 39,
        },
    },
    {
        firstTeam: {
            group: false,
            quarters: true,
            match: 41,
        },
        secondTeam: {
            group: false,
            quarters: true,
            match: 42,
        },
    },
    {
        firstTeam: {
            group: false,
            quarters: true,
            match: 43,
        },
        secondTeam: {
            group: false,
            quarters: true,
            match: 44,
        },
    },
    {
        firstTeam: {
            group: false,
            quarters: true,
            match: 40,
        },
        secondTeam: {
            group: false,
            quarters: true,
            match: 38,
        },
    },
]

export const SEMIFINALS_FIXTURE_RULES = [
    {
        firstTeam: {
            group: false,
            semis: true,
            match: 45,
        },
        secondTeam: {
            group: false,
            semis: true,
            match: 46,
        },
    },
    {
        firstTeam: {
            group: false,
            semis: true,
            match: 47,
        },
        secondTeam: {
            group: false,
            semis: true,
            match: 48,
        },
    },
]

export const FINALS_FIXTURE_RULES = [
    {
        firstTeam: {
            group: false,
            finals: true,
            match: 49,
        },
        secondTeam: {
            group: false,
            finals: true,
            match: 50,
        },
    },
]

export const teams: Team[] = [
    {
        name: 'Germany',
        code: 'de',
        group: 'A',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/de.svg',
        shortName: 'GER',
    },
    {
        name: 'Scotland',
        code: 'gb-sct',
        group: 'A',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/gb-sct.svg',
        shortName: 'SCO',
    },
    {
        name: 'Hungary',
        code: 'hu',
        group: 'A',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/hu.svg',
        shortName: 'HUN',
    },
    {
        name: 'Switzerland',
        code: 'ch',
        group: 'A',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/ch.svg',
        shortName: 'SWI',
    },
    {
        name: 'Spain',
        code: 'es',
        group: 'B',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/es.svg',
        shortName: 'ESP',
    },
    {
        name: 'Croatia',
        code: 'hr',
        group: 'B',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/hr.svg',
        shortName: 'CRO',
    },
    {
        name: 'Italy',
        code: 'it',
        group: 'B',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/it.svg',
        shortName: 'ITA',
    },
    {
        name: 'Albania',
        code: 'al',
        group: 'B',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/al.svg',
        shortName: 'ALB',
    },
    {
        name: 'Slovenia',
        code: 'si',
        group: 'C',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/si.svg',
        shortName: 'SLO',
    },
    {
        name: 'Denmark',
        code: 'dk',
        group: 'C',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/dk.svg',
        shortName: 'DEN',
    },
    {
        name: 'Serbia',
        code: 'rs',
        group: 'C',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/rs.svg',
        shortName: 'SER',
    },
    {
        name: 'England',
        code: 'gb-eng',
        group: 'C',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/gb-eng.svg',
        shortName: 'ENG',
    },
    {
        name: 'Netherlands',
        code: 'nl',
        group: 'D',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/nl.svg',
        shortName: 'NED',
    },
    {
        name: 'Austria',
        code: 'at',
        group: 'D',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/at.svg',
        shortName: 'AUT',
    },
    {
        name: 'France',
        code: 'fr',
        group: 'D',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/fr.svg',
        shortName: 'FRA',
    },
    {
        name: 'Poland',
        code: 'pl',
        group: 'D',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/pl.svg',
        shortName: 'POL',
    },
    {
        name: 'Belgium',
        code: 'be',
        group: 'E',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/be.svg',
        shortName: 'BEL',
    },
    {
        name: 'Slovakia',
        code: 'sk',
        group: 'E',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/sk.svg',
        shortName: 'SVK',
    },
    {
        name: 'Romania',
        code: 'ro',
        group: 'E',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/ro.svg',
        shortName: 'ROM',
    },
    {
        name: 'Ukraine',
        code: 'ua',
        group: 'E',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/ua.svg',
        shortName: 'UKR',
    },
    {
        name: 'Turkey',
        code: 'tr',
        group: 'F',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/tr.svg',
        shortName: 'TUR',
    },
    {
        name: 'Portugal',
        code: 'pt',
        group: 'F',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/pt.svg',
        shortName: 'POR',
    },
    {
        name: 'Georgia',
        code: 'ge',
        group: 'F',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/ge.svg',
        shortName: 'GEO',
    },
    {
        name: 'Czech Republic',
        code: 'cz',
        group: 'F',
        url: 'https://cf.eip.telegraph.co.uk/flags/4x3/cz.svg',
        shortName: 'CZE',
    },
]

export const JoodTokenAddress = '6ouRmNFECtQgjwbwWqjiWGGZxY4DBAttoGtor5CWjTNm'

export const JOOD_MINT_ADDRESS = new PublicKey(
    '6ouRmNFECtQgjwbwWqjiWGGZxY4DBAttoGtor5CWjTNm'
)
export const receiverWallet = new PublicKey(
    'FycTVkMxpjQ1SXtdKUT3n8RseJZEx2BkFeVC83gaBFjY'
)

export const MEMO_PROGRAM_ID = new PublicKey(
    'MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr'
)

export const TOKEN_FEE = 10
