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
import { ShareOnTwiiter } from '@/src/components/ShareOnTwitter'
import { SocialMediaLinks } from '@/src/components/SocialMediaLinks'
import { Heading } from '@/src/components/header/Heading'
import { Finals } from '@/src/components/prediction/Finals'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { QuarterFinalsStandings } from '@/src/components/prediction/QuarterFinalsStandings'
import { Round16Standings } from '@/src/components/prediction/Round16Standings'
import { SemiFinalStandings } from '@/src/components/prediction/SemiFinalStandings'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRankings'
import { createBooleanArray, initializeGroupObject } from '@/utils/utils'
import { useWallet } from '@solana/wallet-adapter-react'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast, Toaster } from 'sonner'

export default function Prediction() {
    const { id } = useParams()
    const router = useRouter()
    // setAllUserStates in one action
    const [allUserSelections, setAllUserSelections] = useState({
        groupStageRankings: initializeGroupObject(groups, MAX_TEAMS_IN_GROUP),
        thirdPlaceRankings: createBooleanArray(THIRDPLACE_MATHCOUNT),
        round16Rankings: createBooleanArray(ROUND16_MATCHCOUNT),
        quarterFinalsRankings: createBooleanArray(KNOCKOUT_MATCHCOUNT),
        semiFinalsRankings: createBooleanArray(SEMIS_MATCHCOUNT),
        finalsRankings: createBooleanArray(FINALS_MATCHCOUNT),
    })

    useEffect(() => {
        async function getData() {
            const data = await fetch(`../getPredictions?shareId=${id}`)
            console.log('data', data.status)
            if (data.status === 200) {
                const allData = await data.json()
                setAllUserSelections(JSON.parse(allData.predictions))
            } else {
                toast.warning(
                    'not a valid shareable prediction link.. redirecting..'
                )
            }
        }
        getData()
    }, [router])

    return (
        <div className="flex flex-col">
            <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4 mt-8">
                <div className="flex flex-row items-center justify-center gap-2">
                    <h1 className="text-xl">Your Saved Bracket</h1>
                    <ShareOnTwiiter
                        url1={`https://www.joodpredicts.xyz/prediction/${id}`}
                        url2={`https://www.joodpredicts.xyz/prediction`}
                    />
                </div>
            </div>
            <div className="pointer-events-none cursor-not-allowed">
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
                        headingText="Final"
                        subHeadingText="Choose your winner"
                    />
                    <Finals
                        setAllUserSelections={setAllUserSelections}
                        allUserSelections={allUserSelections}
                    />
                    <Toaster position="top-center" richColors />
                </Container>
                <div className="sm:hidden">
                    <SocialMediaLinks />
                </div>
            </div>
        </div>
    )
}
