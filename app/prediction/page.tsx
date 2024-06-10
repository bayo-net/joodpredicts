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
import { Finals } from '@/src/components/prediction/Finals'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { QuarterFinalsStandings } from '@/src/components/prediction/QuarterFinalsStandings'
import { Round16Standings } from '@/src/components/prediction/Round16Standings'
import { SemiFinalStandings } from '@/src/components/prediction/SemiFinalStandings'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRankings'
import {
    createBooleanArray,
    initializeGroupObject,
    validateSubmit,
} from '@/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
        const isValid = validateSubmit(allUserSelections, wallet)
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
            <QuarterFinalsStandings
                setAllUserSelections={setAllUserSelections}
                allUserSelections={allUserSelections}
            />
            <Heading
                count={5}
                headingText="Semi-Finals"
                subHeadingText="Choose your winners for each match"
            />
            <SemiFinalStandings
                setAllUserSelections={setAllUserSelections}
                allUserSelections={allUserSelections}
            />
            <Heading
                count={6}
                headingText="Finals"
                subHeadingText="Choose your winner"
            />
            <Finals
                setAllUserSelections={setAllUserSelections}
                allUserSelections={allUserSelections}
            />
            <div
                className="
                flex
                justify-center
                items-center
                mt-5"
            >
                <button
                    className="
                px-3
                py-2
                rounded-lg
                bg-gradient-to-r from-[#004AAD] to-[#001E47]
                font-semibold
                text-sm
                text-[#F9F9F9]
                border-[0.5px]
                border-[#407ED2]
                "
                    onClick={handleSubmit}
                >
                    Submit Bracket
                </button>
            </div>
            <ToastContainer />
        </Container>
    )
}
