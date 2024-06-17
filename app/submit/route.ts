// This is an example of to protect an API route
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '@/utils/dbConnect'
import { rpcEndPointUrl } from '@/constant'
import fetch from 'node-fetch'
import { Entry } from '@/src/backend/schemas/Entry'

const validateSubmit = (predictions: any) => {
    const allUserSelections = JSON.parse(predictions)
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

    const semiFinalsRankingsValid = allUserSelections.semiFinalsRankings.every(
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
        return false
    }
    return true
}

const parseTransactionSignature = async (txSignature: string) => {
    let walletAddress = ''
    const maxRetries = 3
    const retryDelay = 30000 // 30 seconds in milliseconds
    let attempt = 0

    const delay = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms))

    while (attempt < maxRetries) {
        try {
            const reqData = {
                method: 'getTransaction',
                jsonrpc: '2.0',
                id: '1',
                params: [
                    txSignature,
                    { encoding: 'jsonParsed', commitment: 'finalized' },
                ],
            }

            const txResponse = await fetch(rpcEndPointUrl, {
                method: 'POST',
                body: JSON.stringify(reqData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            const data: any = await txResponse.json()

            walletAddress = JSON.parse(
                data?.result?.transaction?.message?.instructions.filter(
                    (obj: any) => obj.program === 'spl-memo'
                )[0].parsed
            ).walletAddress
            return {
                walletAddress,
            }
        } catch (err) {
            console.log(`Attempt ${attempt + 1} failed:`, err)
            attempt++
            if (attempt < maxRetries) {
                console.log(
                    `Retrying in 30 seconds... (${attempt + 1}/${maxRetries})`
                )
                await delay(retryDelay)
            } else {
                console.log('Max retries reached. Giving up.')
            }
        }
    }

    return {
        walletAddress,
    }
}

export async function POST(req: Request, res: Response) {
    try {
        await dbConnect()

        const { walletAddress, shareId, predictions, txSignature } =
            await req.json()

        if (!walletAddress) {
            console.log('wallet address missing')
            return new Response('Wallet Address missing', { status: 403 })
        }

        if (!shareId) {
            console.log('shareid missing')
            return new Response('shareid available', { status: 403 })
        }

        if (!validateSubmit(predictions)) {
            console.log('predictions missing')
            return new Response('prediction data missing', { status: 500 })
        }

        if (!txSignature) {
            console.log('txSignature missing')
            return new Response('transaction signature data missing', {
                status: 500,
            })
        }

        // const { walletAddress: parsedTxWalletAddress } =
        //     await parseTransactionSignature(txSignature)

        if (true) {
            console.log("It's a valid call")
            const foundWallet = await Entry.findOne({ _id: walletAddress })
            if (foundWallet) {
                console.log(
                    'wallet address' + walletAddress + ' already exists'
                )
                return new Response('Wallet address already exists', {
                    status: 403,
                })
            } else {
                console.log('adding entry to the db' + walletAddress)
                const entryAdded = await new Entry({
                    _id: walletAddress,
                    shareId,
                    predictions,
                }).save()
                return new Response(entryAdded, { status: 200 })
            }
        }

        return new Response('memo transaction wallet address different', {
            status: 403,
        })
    } catch (err) {
        console.log('err', err)
        return new Response(null, { status: 500 })
    }
}
