import { twMerge } from 'tailwind-merge'
import {
    QUARTERS_STARTMATCH_NUM,
    ROUND16_STARTMATCH_NUM,
    RUNNERUP,
    SEMIS_STARTMATCH_NUM,
    THIRDPLACE_MATHCOUNT,
    THIRD_PLACE_STANDING,
    WINNER,
    groups,
    teams,
} from '@/constant'
import { Team } from './types/sharedtypes'
import { toast } from 'react-toastify'
import { WalletContextState } from '@solana/wallet-adapter-react'

export const merge = (...args: any) => {
    return twMerge(...args)
}

export const checkIfTeamAlreadySelected = () => {}

export const groupCountriesMap = () => {
    const allTeams: any[] = []
    groups.forEach((group) => {
        const teamsByGroup = teams.filter((team: Team) => team.group === group)
        allTeams.push(teamsByGroup)
    })
    return allTeams
}

export const initializeGroupObject = (groups: string[], length: number) => {
    const obj: any = {}
    groups.forEach((group) => {
        obj[group] = new Array(length).fill(false)
    })
    return obj
}

export const createBooleanArray = (end: number) => {
    return new Array(end).fill(false)
}

export const getThirdPlaceRankings = (allUserSelections: any) => {
    const result = createBooleanArray(THIRDPLACE_MATHCOUNT)
    Object.keys(allUserSelections.groupStageRankings).forEach((group) => {
        const val =
            allUserSelections.groupStageRankings[group][
                THIRD_PLACE_STANDING - 1
            ]
        for (let index in result) {
            if (result[index] === false && val) {
                result[index] = val
                break
            }
        }
    })
    return result
}

export const mergeObjects = (obj1: any, obj2: any) => {
    return Object.assign(obj1, obj2)
}

export const getFallbackTextContent = (team: any) => {
    const { group, position } = team
    let positionText = ''
    if (group) {
        if (position === WINNER) {
            positionText = 'Winner'
        } else if (position === RUNNERUP) {
            positionText = 'Runner up'
        }
        return `Group ${group} ${positionText}`
    } else if (team && team.thirdPlaceRanked) {
        return `Third placed team`
    } else if (team && team.quarters) {
        return `Match ${team.match} Winner`
    } else if (team && team.semis) {
        return `Match ${team.match} Winner`
    } else if (team && team.finals) {
        return `Match ${team.match} Winner`
    }
}

export const getTeamInfoFromPosition = (team: any, allUserSelections: any) => {
    if (team.group) {
        return allUserSelections.groupStageRankings[team.group][team.position]
    } else if (team.thirdPlaceRanked) {
        return allUserSelections.thirdPlaceRankings[team.position]
    } else if (team.quarters) {
        const index = team.match - ROUND16_STARTMATCH_NUM
        return allUserSelections.round16Rankings[index]
    } else if (team.semis) {
        const index = team.match - QUARTERS_STARTMATCH_NUM
        return allUserSelections.quarterFinalsRankings[index]
    } else if (team.finals) {
        const index = team.match - SEMIS_STARTMATCH_NUM
        return allUserSelections.semiFinalsRankings[index]
    }
}

export const validateSubmit = (
    allUserSelections: any,
    wallet: WalletContextState
) => {
    try {
        console.log('is wallet connected', wallet.connected)
        if (!wallet.connected) {
            toast('Connect your wallet to submit', {
                position: 'bottom-right',
                closeOnClick: true,
                theme: 'dark',
            })
            return false
        }

        // group stages
        const groupStageValid = Object.keys(
            allUserSelections.groupStageRankings
        ).every((group) =>
            allUserSelections.groupStageRankings[group].every(
                (team: any) => team !== false && typeof team !== 'undefined'
            )
        )

        const thirdPlaceValid = allUserSelections.thirdPlaceRankings.every(
            (team: any) => team !== false && typeof team !== 'undefined'
        )

        const round16RankingsValid = allUserSelections.round16Rankings.every(
            (team: any) => team !== false && typeof team !== 'undefined'
        )

        const quarterFinalsRankingsValid =
            allUserSelections.quarterFinalsRankings.every(
                (team: any) => team !== false && typeof team !== 'undefined'
            )

        const semiFinalsRankingsValid =
            allUserSelections.semiFinalsRankings.every(
                (team: any) => team !== false && typeof team !== 'undefined'
            )

        const finalsRankingsValid = allUserSelections.finalsRankings.every(
            (team: any) => team !== false && typeof team !== 'undefined'
        )

        if (
            !groupStageValid ||
            !thirdPlaceValid ||
            !round16RankingsValid ||
            !quarterFinalsRankingsValid ||
            !semiFinalsRankingsValid ||
            !finalsRankingsValid
        ) {
            alert(
                'Validation failed: Please make sure all group rankings are filled out correctly.'
            )
            return false
        }
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}
