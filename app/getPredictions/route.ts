// This is an example of to protect an API route
import dbConnect from '@/utils/dbConnect'
import { Entry } from '@/src/backend/schemas/Entry'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
        await dbConnect()
        const { searchParams } = new URL(req.url)
        const shareId = searchParams.get('shareId')
        const walletAddress = searchParams.get('walletAddress')

        if (!shareId && !walletAddress) {
            return new Response('details not present to fetch', {
                status: 403,
            })
        }

        let filter: any = {}
        if (shareId) {
            filter.shareId = shareId
        } else {
            filter._id = walletAddress
        }

        const foundWallet = await Entry.findOne(filter)

        if (foundWallet) {
            return NextResponse.json(foundWallet, {
                status: 200,
            })
        } else {
            return NextResponse.json(null, {
                status: 404,
            })
        }
    } catch (err) {
        return new Response(JSON.stringify(err), { status: 500 })
    }
}
