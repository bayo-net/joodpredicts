'use client'

import {
    FINALS_MATCHCOUNT,
    groups,
    KNOCKOUT_MATCHCOUNT,
    MAX_TEAMS_IN_GROUP,
    ROUND16_MATCHCOUNT,
    SEMIS_MATCHCOUNT,
    THIRDPLACE_MATHCOUNT,
} from '@/constant'
import { Container } from '@/src/components/Container'
import { Heading } from '@/src/components/header/Heading'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { Round16Standings } from '@/src/components/prediction/Round16Standings'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRankings'
import { createBooleanArray, initializeGroupObject } from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

export default function Prediction() {
    // setAllUserStates in one action
    const [allUserSelections, setAllUserSelections] = useState({
        groupStageRankings: initializeGroupObject(groups, MAX_TEAMS_IN_GROUP),
        thirdPlaceRankings: createBooleanArray(THIRDPLACE_MATHCOUNT),
        round16Rankings: createBooleanArray(ROUND16_MATCHCOUNT),
        quarterFinalsRankings: createBooleanArray(KNOCKOUT_MATCHCOUNT),
        semiFinalsRankings: createBooleanArray(SEMIS_MATCHCOUNT),
        finalsRankings: createBooleanArray(FINALS_MATCHCOUNT),
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
                allUserSelections={allUserSelections}
                setAllUserSelections={setAllUserSelections}
            />
            <Heading
                count={2}
                headingText="Third Place Rankings"
                subHeadingText="Put your third place teams in order of best performance"
            />
            <ThirdPlaceRankings
                allUserSelections={allUserSelections}
                setAllUserSelections={setAllUserSelections}
            />
            <Heading
                count={3}
                headingText="Round of 16"
                subHeadingText="Choose your winners for each match"
            />
            <Round16Standings
                allUserSelections={allUserSelections}
                setAllUserSelections={setAllUserSelections}
            />
            <Heading
                count={4}
                headingText="Quarter Finals"
                subHeadingText="Choose your winners for each match"
            />
        </Container>
    )
}
