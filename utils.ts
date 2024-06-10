import { twMerge } from 'tailwind-merge'
import {
    RUNNERUP,
    THIRDPLACED,
    THIRDPLACE_MATHCOUNT,
    THIRD_PLACE_STANDING,
    WINNER,
    groups,
    teams,
} from '@/constant'
import { Team } from './types/sharedtypes'

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
    } else {
        return `Third placed team`
    }
}

export const getTeamInfoFromPosition = (team: any, allUserSelections: any) => {
    if (team.group) {
        return allUserSelections.groupStageRankings[team.group][team.position]
    } else {
        return allUserSelections.thirdPlaceRankings[team.position]
    }
}
