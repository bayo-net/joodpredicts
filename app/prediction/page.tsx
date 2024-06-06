'use client'

import { groups, MAX_TEAMS_IN_GROUP } from '@/constant'
import { Container } from '@/src/components/Container'
import { Heading } from '@/src/components/header/Heading'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRakings'
import { useState } from 'react'

const initializeGroupObject = (groups: string[], length: number) => {
    const obj: any = {}
    groups.forEach((group) => {
        obj[group] = new Array(length).fill(false)
    })
    return obj
}

const createBooleanObject = (start: number, end: number, value: boolean) => {
    const obj: any = {}
    for (let i = start; i <= end; i++) {
        obj[i] = value
    }
    return obj
}

export default function Prediction() {
    const [userSelection, setUserSelection] = useState(
        initializeGroupObject(groups, MAX_TEAMS_IN_GROUP)
    )
    const [thirdPlaceRankings, setThirdPlaceRankings] = useState(
        createBooleanObject(0, MAX_TEAMS_IN_GROUP + 1, false)
    )

    // const [round16Rankings, setRound16Rankings] = useState([])

    return (
        <Container>
            <Heading
                count={1}
                headingText="Select Group Stage"
                subHeadingText="Select the final group positions"
            />
            <GroupStageTable
                setUserSelection={setUserSelection}
                userSelection={userSelection}
                thirdPlaceRankings={thirdPlaceRankings}
                setThirdPlaceRankings={setThirdPlaceRankings}
            />
            <Heading
                count={2}
                headingText="Third Place Rankings"
                subHeadingText="Put your third place teams in order of best performance"
            />
            <ThirdPlaceRankings
                setUserSelection={setUserSelection}
                userSelection={userSelection}
                setThirdPlaceRankings={setThirdPlaceRankings}
                thirdPlaceRankings={thirdPlaceRankings}
            />
        </Container>
    )
}
