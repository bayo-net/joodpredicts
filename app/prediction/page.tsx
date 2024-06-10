'use client'

import {
    FINALS_MATCHCOUNT,
    groups,
    JOOD_MINT_ADDRESS,
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

    const doTransfer = async () => {
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
            throw new Error(
                `Transaction failed due to Solana network congestion, please try again.`
            )
        }

        return signature
    }

    const handleSubmit = async () => {
        console.log('submit', wallet.connected)
        const isValid = validateSubmit(allUserSelections, wallet)
        if (isValid) {
            setOpenModal(true)
            setIsLoading(false)
        }
    }

    const handleApprove = async () => {
        try {
            setIsLoading(true)
            const allTokens = await fetchAllSplTokens(
                wallet?.publicKey?.toBase58()!,
                connection
            )
            const amountExists = getTokenExistsAndUiAmount(allTokens)
            if (!amountExists) {
                toast.error('Not enough JOOD in the wallet')
            } else {
                await doTransfer()
                setIsLoading(false)
                setOpenModal(false)
                toast.success('Successfully submitted prediction')
            }
        } catch (err) {
            console.log('error', err)
        }
    }

    if (isLoading) {
        toast.info('Please approve transaction in the wallet')
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
            <div id="modal-portal"></div>
        </Container>
    )
}
