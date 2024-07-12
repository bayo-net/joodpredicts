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
    rpcEndPointUrl,
    teams,
} from '@/constant'
import { Team } from '../types/sharedtypes'
import { WalletContextState } from '@solana/wallet-adapter-react'
import {
    BlockhashWithExpiryBlockHeight,
    Commitment,
    Connection,
    TransactionExpiredBlockheightExceededError,
} from '@solana/web3.js'
import promiseRetry from 'promise-retry'
import { toast } from 'sonner'

export const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
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
        if (!wallet.connected) {
            toast.error('Connect your wallet to submit')
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
            toast.error('Please make sure all predictions are completed!')
            return false
        }
        return true
    } catch (err) {
        console.log(err)
        return false
    }
}

export const executeTransaction = async (
    connection: Connection,
    tx: Buffer,
    blockhashInfo: BlockhashWithExpiryBlockHeight
): Promise<string | null> => {
    const sendOptions = {
        maxRetries: 0,
        skipPreflight: true,
        preflightCommitment: 'confirmed' as Commitment,
    }

    const txid = await connection.sendRawTransaction(tx, sendOptions)
    console.log(txid)

    const controller = new AbortController()
    const abortSignal = controller.signal

    const abortableResender = async () => {
        while (true) {
            await sleep(2_000)
            if (abortSignal.aborted) return
            try {
                await connection.sendRawTransaction(tx, sendOptions)
            } catch (e) {
                console.warn(`Failed to resend transaction: ${e}`)
            }
        }
    }

    try {
        abortableResender()
        const lastValidBlockHeight = blockhashInfo.lastValidBlockHeight - 150

        // this would throw TransactionExpiredBlockheightExceededError
        await Promise.race([
            connection.confirmTransaction(
                {
                    ...blockhashInfo,
                    lastValidBlockHeight,
                    signature: txid,
                    abortSignal,
                },
                'confirmed'
            ),
            new Promise(async (resolve) => {
                // in case ws socket died
                while (!abortSignal.aborted) {
                    await sleep(2_000)
                    const tx = await connection.getSignatureStatus(txid, {
                        searchTransactionHistory: false,
                    })
                    if (tx?.value?.confirmationStatus === 'confirmed') {
                        resolve(tx)
                    }
                }
            }),
        ])
    } catch (e) {
        if (e instanceof TransactionExpiredBlockheightExceededError) {
            // we consume this error and getTransaction would return null
            return null
        } else {
            // invalid state from web3.js
            throw e
        }
    } finally {
        controller.abort()
    }

    // in case rpc is not synced yet, we add some retries
    const txResult = await promiseRetry(
        async (retry) => {
            const response = await connection.getTransaction(txid, {
                commitment: 'confirmed',
                maxSupportedTransactionVersion: 0,
            })
            if (!response) {
                retry(response)
            }
            return response
        },
        {
            retries: 5,
            minTimeout: 1e3,
        }
    )

    if (!txResult || txResult.meta?.err) {
        return null
    }

    return txid
}

export const trimWalletAddress = (walletAddress: string) => {
    if (walletAddress) {
        return walletAddress.length > 12
            ? `${walletAddress.substring(0, 12)}..`
            : walletAddress
    }
}
