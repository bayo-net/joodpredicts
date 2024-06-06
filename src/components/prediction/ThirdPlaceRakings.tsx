'use client'

import { THIRD_PLACE_STANDING } from '@/constant'
import { merge } from '@/utils'
import Image from 'next/image'
import { useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import * as _ from 'lodash'

interface ThirdPlaceRakingsProps {
    setUserSelection: any
    userSelection: any
    setThirdPlaceRankings: any
    thirdPlaceRankings: any
}

export const ThirdPlaceRankings: React.FC<ThirdPlaceRakingsProps> = ({
    setUserSelection,
    userSelection,
    setThirdPlaceRankings,
    thirdPlaceRankings,
}) => {
    // console.log('thirdPlaceRankings', thirdPlaceRankings)

    useEffect(() => {
        // console.log('user Selection', userSelection)

        for (let group in userSelection) {
            // console.log('group', group)
            for (let team in userSelection[group]) {
                if (
                    team &&
                    userSelection[group][THIRD_PLACE_STANDING - 1] !== false
                ) {
                    setThirdPlaceRankings((prevState: any) => {
                        const thirdPlaceRankingsState = _.cloneDeep(prevState)
                        for (let key2 in thirdPlaceRankingsState) {
                            if (thirdPlaceRankingsState[key2] === false) {
                                thirdPlaceRankingsState[key2] =
                                    userSelection[group][
                                        THIRD_PLACE_STANDING - 1
                                    ]
                                break
                            }
                        }
                        return thirdPlaceRankingsState
                    })
                }
            }
        }
        console.log('thirdPlaceRank', thirdPlaceRankings)
    }, [userSelection])

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between mb-2 space-x-2">
                {thirdPlaceRankings &&
                    Object.keys(thirdPlaceRankings).map((team: any) => {
                        return (
                            <button
                                className={merge(
                                    `
                                    flex
                                    sm:flex-grow
                                    min-h-9
                                    bg-slate-800
                                    rounded-md 
                                    hover:bg-orange-500
                                    transition
                                    duration-300
                                    relative
                                    `
                                )}
                                key={uuidv4()}
                            >
                                {thirdPlaceRankings[team] && (
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row gap-2">
                                        <Image
                                            src={thirdPlaceRankings[team].url}
                                            alt="country_image"
                                            width={20}
                                            height={15}
                                        />
                                        <p>
                                            {thirdPlaceRankings[team].shortName}
                                        </p>
                                    </div>
                                )}
                            </button>
                        )
                    })}
            </div>
        </div>
    )
}
