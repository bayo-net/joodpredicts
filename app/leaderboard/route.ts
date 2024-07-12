import dbConnect from '@/utils/dbConnect'
// import fetch from 'node-fetch'
import { Entry } from '@/src/backend/schemas/Entry'
import { finalResults } from '@/utils/finalResults'

export async function GET() {
    try {
        await dbConnect()
        const allRecords = await Entry.find({})
        const leaderBoardWalletAddress: {
            walletAddress: any
            pointsCount: number
        }[] = []
        const {
            groupStageRankings: groupStageResults,
            thirdPlaceRankings: thirdPlaceResults,
            round16Rankings: round16Results,
            quarterFinalsRankings: quarterFinalsResults,
            semiFinalsRankings: semiFinalsResults,
            finalsRankings: finalsResults,
        } = finalResults()
        allRecords.forEach((record: any) => {
            const walletAddress = record._id
            const userPrediction = record.predictions
            const {
                groupStageRankings,
                thirdPlaceRankings,
                round16Rankings,
                quarterFinalsRankings,
                semiFinalsRankings,
                finalsRankings,
            } = JSON.parse(userPrediction)
            let pointsCount = 0
            Object.keys(groupStageResults).forEach((group: string) => {
                groupStageRankings[group].forEach(
                    (teamCode: any, index: number) => {
                        // @ts-ignore
                        if (teamCode.code === groupStageResults[group][index]) {
                            pointsCount++
                        }
                    }
                )
            })
            // Compare third place rankings
            if (thirdPlaceRankings) {
                thirdPlaceRankings.forEach((team: any, index: number) => {
                    if (team.code === thirdPlaceResults[index]) {
                        pointsCount += 3
                    }
                })
            }

            // Compare third place rankings
            if (round16Rankings) {
                round16Rankings.forEach((team: any) => {
                    if (round16Results.includes(team.code)) {
                        pointsCount += 5
                    }
                })
            }
            // Compare third place rankings
            if (quarterFinalsRankings) {
                quarterFinalsRankings.forEach((team: any) => {
                    if (quarterFinalsResults.includes(team.code)) {
                        pointsCount += 7
                    }
                })
            }

            // Compare third place rankings
            if (semiFinalsRankings) {
                semiFinalsRankings.forEach((team: any) => {
                    if (semiFinalsResults.includes(team.code)) {
                        pointsCount += 10
                    }
                })
            }

            // Compare third place rankings
            if (finalsRankings) {
                finalsRankings.forEach((team: any) => {
                    // @ts-ignore
                    if (finalsResults.includes(team.code)) {
                        pointsCount += 15
                    }
                })
            }

            // Prepare the leaderboard entry
            leaderBoardWalletAddress.push({
                walletAddress,
                pointsCount,
            })
        })
        // Sort the leaderboard by the number of correct predictions in descending order
        leaderBoardWalletAddress.sort((a, b) => b.pointsCount - a.pointsCount)
        return new Response(JSON.stringify(leaderBoardWalletAddress), {
            status: 200,
        })
    } catch (err) {
        console.log('error', err)
        return new Response('not working', { status: 403 })
    }
}
