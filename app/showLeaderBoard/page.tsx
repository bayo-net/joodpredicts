'use client'

import { Container } from '@/src/components/Container'
import { Heading } from '@/src/components/header/Heading'
import { trimWalletAddress } from '@/utils/utils'
import { useEffect, useState } from 'react'

export default function Leaderboard() {
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState(false)

    const getLeaderBoard = async () => {
        setLoading(true)
        const leaderBoardData = await fetch('/leaderboard')
        setData(await leaderBoardData.json())
        setLoading(false)
    }

    useEffect(() => {
        getLeaderBoard()
    }, [])

    const PopulateLeaderBoard = () => (
        <Container>
            <div className="flex gap-3 py-4 items-center mt-4 overflow-x-scroll sm:overflow-hidden">
                <div className="flex flex-col flex-grow flex-shrink-0">
                    <h1 className="text-xl text-center">Leaderboard</h1>
                </div>
            </div>
            {/* {data.map((record, index) => (
                <div className="flex flex-col">
                    <div className="-m-1.5 overflow-x-auto">
                        <div className="p-1.5 min-w-full inline-block align-middle">
                            <div className="border rounded-lg shadow overflow-hidden dark:border-neutral-700 dark:shadow-gray-900">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                                    <thead className="bg-gray-50 dark:bg-neutral-700">
                                        <tr>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                            >
                                                Wallet Address
                                            </th>
                                            <th
                                                scope="col"
                                                className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-400"
                                            >
                                                Points Earned
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                                        <tr>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-neutral-200">
                                                {trimWalletAddress(
                                                    record.walletAddress
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                                                {record.pointsCount}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))} */}
            <div
                className="w-full md:w-1/2 mx-auto 
                rounded-lg
                border-[0.5px] border-[#242424] bg-[#171616]
                "
            >
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-center bg-[#171616]">
                                    Wallet Address
                                </th>
                                <th className="px-4 py-2 text-center bg-[#171616]">
                                    Points Earned
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((row, index) => (
                                <tr
                                    key={index}
                                    className="border-t border-gray-200 dark:border-gray-700"
                                >
                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 text-center">
                                        {row.walletAddress}
                                    </td>
                                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200 text-center">
                                        {row.pointsCount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Container>
    )

    if (!data || loading) {
        return <div>Loading...</div>
    }

    return <div>{data && <PopulateLeaderBoard />}</div>
}
