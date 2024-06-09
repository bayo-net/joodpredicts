'use client'

import { groups, MAX_TEAMS_IN_GROUP, ROUND16_MATCHCOUNT } from '@/constant'
import { Container } from '@/src/components/Container'
import { Heading } from '@/src/components/header/Heading'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRankings'
import { useWallet } from '@solana/wallet-adapter-react'
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
    const [thirdPlaceUserSelection, setThirdPlaceUserSelection] = useState(
        createBooleanObject(0, MAX_TEAMS_IN_GROUP + 1, false)
    )

    const [round16Selections, setRound16Selections] = useState(
        createBooleanObject(0, ROUND16_MATCHCOUNT, false)
    )

    // setAllUserStates in one action
    const [allUserSelections, setAllUserSelections] = useState({
        thirdPlaceRankings: [
            createBooleanObject(0, MAX_TEAMS_IN_GROUP + 1, false),
        ],
        round16Rankings: [
            createBooleanObject(0, MAX_TEAMS_IN_GROUP + 1, false),
        ],
        quarterFinalsRankings: [
            createBooleanObject(0, ROUND16_MATCHCOUNT, false),
        ],
        finalsRankings: [createBooleanObject(0, 1, false)],
    })

    const wallet = useWallet()

    const handleSubmit = () => {
        if (!wallet.connected) {
            alert('wallet not not connected')
        }
    }

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
                userSelection={userSelection}
                setThirdPlaceRankings={setThirdPlaceRankings}
                thirdPlaceRankings={thirdPlaceRankings}
                thirdPlaceUserSelection={thirdPlaceUserSelection}
                setThirdPlaceUserSelection={setThirdPlaceUserSelection}
            />
            <Heading
                count={3}
                headingText="Round of 16"
                subHeadingText="Choose your winners for each match"
            />
            <button
                className="text-white border flex justify-center items-center rounded-lg mx-auto px-3 py-2"
                onClick={handleSubmit}
            >
                Submit Prediction
            </button>
        </Container>
    )
}
