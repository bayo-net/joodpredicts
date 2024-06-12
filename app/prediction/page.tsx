'use client'

import {
    FINALS_MATCHCOUNT,
    groups,
    JoodTokenAddress,
    KNOCKOUT_MATCHCOUNT,
    MAX_TEAMS_IN_GROUP,
    MEMO_PROGRAM_ID,
    receiverWallet,
    ROUND16_MATCHCOUNT,
    rpcEndPointUrl,
    SEMIS_MATCHCOUNT,
    THIRDPLACE_MATHCOUNT,
    TOKEN_FEE,
} from '@/constant'
import { Container } from '@/src/components/Container'
import Modal from '@/src/components/modal/Modal'
import { Heading } from '@/src/components/header/Heading'
import { Finals } from '@/src/components/prediction/Finals'
import { GroupStageTable } from '@/src/components/prediction/GroupStageTable'
import { QuarterFinalsStandings } from '@/src/components/prediction/QuarterFinalsStandings'
import { Round16Standings } from '@/src/components/prediction/Round16Standings'
import { SemiFinalStandings } from '@/src/components/prediction/SemiFinalStandings'
import { ThirdPlaceRankings } from '@/src/components/prediction/ThirdPlaceRankings'
import getOrCreateAssociatedTokenAccount from '@/utils/solana/getOrCreateAssociatedTokenAccont'
import {
    fetchAllSplTokens,
    getTokenExistsAndUiAmount,
} from '@/utils/splTokenUtils'
import {
    createBooleanArray,
    executeTransaction,
    initializeGroupObject,
    validateSubmit,
} from '@/utils/utils'
import {
    TOKEN_PROGRAM_ID,
    createTransferInstruction,
    getMint,
} from '@solana/spl-token'
import { WalletNotConnectedError } from '@solana/wallet-adapter-base'
import { useWallet } from '@solana/wallet-adapter-react'
import {
    Connection,
    PublicKey,
    Transaction,
    TransactionInstruction,
} from '@solana/web3.js'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import { Disclaimer } from '@/src/components/Disclaimer'
import { LoadingSpinner } from '@/src/components/LoadingSpinner'
import { useRouter } from 'next/navigation'
import { SocialMediaLinks } from '@/src/components/SocialMediaLinks'
import { BsTelegram, BsTwitterX } from 'react-icons/bs'
import Head from 'next/head'

export default function Prediction() {
    const wallet = useWallet()
    // setAllUserStates in one action
    const [allUserSelections, setAllUserSelections] = useState({
        groupStageRankings: initializeGroupObject(groups, MAX_TEAMS_IN_GROUP),
        thirdPlaceRankings: createBooleanArray(THIRDPLACE_MATHCOUNT),
        round16Rankings: createBooleanArray(ROUND16_MATCHCOUNT),
        quarterFinalsRankings: createBooleanArray(KNOCKOUT_MATCHCOUNT),
        semiFinalsRankings: createBooleanArray(SEMIS_MATCHCOUNT),
        finalsRankings: createBooleanArray(FINALS_MATCHCOUNT),
    })

    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const connection = new Connection(rpcEndPointUrl, 'confirmed')
    const router = useRouter()

    const doTransfer = async () => {
        try {
            if (!wallet.publicKey || !wallet.signTransaction)
                throw new WalletNotConnectedError('Please connect a wallet.')

            const splToken = new PublicKey(JoodTokenAddress)
            const mintInfo = await getMint(connection, splToken)
            if (!mintInfo) {
                throw new Error('Invalid token')
            }

            const amountBN = TOKEN_FEE * Math.pow(10, mintInfo.decimals)
            // Get the token account of the fromWallet Solana address, if it does not exist, create it
            const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                wallet.publicKey,
                splToken,
                wallet.publicKey,
                wallet.signTransaction
            )

            const toTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                wallet.publicKey,
                splToken,
                receiverWallet,
                wallet.signTransaction
            )

            const transaction = new Transaction().add(
                createTransferInstruction(
                    fromTokenAccount.address, // source
                    toTokenAccount.address, // dest
                    wallet.publicKey,
                    amountBN,
                    [],
                    TOKEN_PROGRAM_ID
                )
            )

            const txData = {
                store: 'COINGOAL',
                type: 'prediction',
                walletAddress: wallet.publicKey,
            }

            transaction.add(
                new TransactionInstruction({
                    keys: [
                        {
                            pubkey: wallet.publicKey,
                            isSigner: true,
                            isWritable: true,
                        },
                    ],
                    data: Buffer.from(
                        JSON.stringify(txData).replace(' ', ''),
                        'utf8'
                    ),
                    programId: MEMO_PROGRAM_ID,
                })
            )

            if (fromTokenAccount.amount < TOKEN_FEE) {
                throw new Error('Balance is not enough.')
            }

            const latestBlockHash = await connection.getLatestBlockhash()
            transaction.feePayer = wallet.publicKey
            transaction.recentBlockhash = latestBlockHash.blockhash

            const walletSignedTx = await wallet.signTransaction(transaction)
            const signature = await executeTransaction(
                connection,
                walletSignedTx.serialize(),
                latestBlockHash
            )

            if (!signature) {
                toast.error(
                    'Transaction failed due to Solana network congestion, please try again.'
                )
                throw new Error(
                    `Transaction failed due to Solana network congestion, please try again.`
                )
            }
            return signature
        } catch (err) {
            toast.error(`Error while processing transaction.. ${err}`)
            setIsLoading(false)
            setOpenModal(false)
            return null
        }
    }

    const handleSubmit = async () => {
        const isValid = validateSubmit(allUserSelections, wallet)
        if (isValid) {
            setOpenModal(true)
            setIsLoading(false)
        }
    }

    const handleApprove = async () => {
        try {
            // await fetch('/getPredictions')
            setIsLoading(true)
            const allTokens = await fetchAllSplTokens(
                wallet?.publicKey?.toBase58()!,
                connection
            )
            const amountExists = getTokenExistsAndUiAmount(allTokens)
            if (!amountExists) {
                toast.error('Not enough JOOD in the wallet')
            } else {
                const txSignature = await doTransfer()
                if (!txSignature) {
                    return
                }
                const shareId = window && window.crypto.randomUUID()
                const reqBody = {
                    walletAddress: wallet?.publicKey,
                    shareId,
                    predictions: JSON.stringify(allUserSelections),
                    txSignature,
                }
                const data = await fetch('/submit', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(reqBody),
                })
                if (data.status === 200) {
                    toast.success('Successfully submitted prediction')
                    router.push(`/prediction/${shareId}`)
                } else {
                    toast.error(
                        `Failed to save prediction: ${await data.json()}`
                    )
                }
            }
        } catch (err) {
            console.log('error', err)
        } finally {
            // save the record to database
            setIsLoading(false)
            setOpenModal(false)
            // Navigate to the predictions page if needed
        }
    }

    if (isLoading) {
        toast.info('Please approve transaction in the wallet')
    }

    useEffect(() => {
        async function getData() {
            if (wallet.connected) {
                const data = await fetch(
                    `./getPredictions?walletAddress=${wallet?.publicKey}`
                )
                if (data.status === 200) {
                    const record = await data.json()
                    router.push(`/prediction/${record.shareId}`)
                }
            }
        }
        getData()
    }, [wallet])

    return (
        <>
            <Head>
                <title>JOODPredicts</title>
                <meta name="description" content="JOODPredicts by JOODonSOL" />
                <link rel="short icon" href="logo.png" />
                <link rel="icon" href="logo.png" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta
                    property="twitter:url"
                    content={
                        'https://pbs.twimg.com/media/GPzBNA3XoAApr6C?format=jpg&name=large'
                    }
                />
                <meta property="twitter:title" content="JOODPredicts" />
                <meta
                    property="twitter:description"
                    content="JOODPredicts by JOODonSOL"
                />
                <meta
                    property="twitter:image"
                    content="https://pbs.twimg.com/media/GP4YflfbYAAx-kl?format=png&name=small"
                />
            </Head>
            <main>
                <div className="relative">
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
                            {isOpenModal && (
                                <Modal
                                    isOpen={isOpenModal}
                                    handleClose={() => {
                                        setOpenModal(false)
                                    }}
                                    className="m-5 p-5 bg-[#242424] rounded-3xl shadow-lg px-8 w-[40vh] sm:w-[70vh] mx-auto"
                                >
                                    {!isLoading && (
                                        <Disclaimer
                                            handleClose={() => {
                                                setOpenModal(false)
                                            }}
                                            handleApprove={handleApprove}
                                        />
                                    )}
                                    {isLoading && <LoadingSpinner />}
                                </Modal>
                            )}
                        </div>
                        <Toaster position="top-center" richColors />
                        <div className="block sm:hidden absolute left-1/2 -translate-x-1/2 -bottom-14">
                            <div className="flex flex-row justify-between items-center gap-4">
                                <a
                                    href="https://x.com/joodonsol"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <BsTwitterX className="cursor-pointer w-4 h-4" />
                                </a>
                                <a
                                    href="https://t.me/joodonsol"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <BsTelegram className="cursor-pointer w-4 h-4" />
                                </a>
                                <a
                                    href="https://dexscreener.com/solana/huwamsh3x6vtsm73unemsmfn4ygf4kfdne8ahy6ez5ly"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    <img
                                        src="dex-screener.png"
                                        alt="dexscreener"
                                        className="rounded-full w-6 h-6"
                                    />
                                </a>
                            </div>
                        </div>
                        <div id="modal-portal"></div>
                    </Container>
                </div>
            </main>
        </>
    )
}
