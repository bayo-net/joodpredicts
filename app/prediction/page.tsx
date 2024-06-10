'use client'

import {
    FINALS_MATCHCOUNT,
    groups,
    JOOD_MINT_ADDRESS,
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
import { Modal } from '@/src/components/Modal'
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

    const [isOpenModal, setOpenModal] = useState<boolean>(false)
    const [userApprovedTrans, setUserApprovedTrans] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const connection = new Connection(rpcEndPointUrl, 'confirmed')

    const wallet = useWallet()

    const doTranfer = async () => {
        if (!wallet.publicKey || !wallet.signTransaction)
            throw new WalletNotConnectedError('Please connect a wallet.')

        const splToken = new PublicKey(JOOD_MINT_ADDRESS)
        const mintInfo = await getMint(connection, splToken)
        if (!mintInfo) {
            throw new Error('Invalid token')
        }

        const amountBN = TOKEN_FEE * Math.pow(10, mintInfo.decimals)
        // Get the token account of the fromWallet Solana address, if it does not exist, create it
        const fromTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet.publicKey,
            JOOD_MINT_ADDRESS,
            wallet.publicKey,
            wallet.signTransaction
        )

        const toTokenAccount = await getOrCreateAssociatedTokenAccount(
            connection,
            wallet.publicKey,
            JOOD_MINT_ADDRESS,
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
            prediction: JSON.stringify(allUserSelections),
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
        // const isValid = validateSubmit(allUserSelections, wallet)
        setOpenModal(true)
        setIsLoading(true)
        if (true && wallet.connected && userApprovedTrans) {
            const allTokens = await fetchAllSplTokens(
                wallet?.publicKey?.toBase58()!,
                connection
            )
            const amountExists = getTokenExistsAndUiAmount(allTokens)
            if (!amountExists) {
                toast('Not enough JOOD in the wallet', {
                    position: 'top-center',
                    closeOnClick: true,
                    theme: 'dark',
                })
            } else {
                await doTranfer()
            }
        }
        setIsLoading(false)
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
                        onClose={() => setOpenModal(false)}
                        setOpenModal={setOpenModal}
                        setUserApprovedTrans={setUserApprovedTrans}
                    />
                )}
                {isLoading && (
                    <div role="status">
                        <svg
                            aria-hidden="true"
                            className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-white"
                            viewBox="0 0 100 101"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                fill="currentColor"
                            />
                            <path
                                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                fill="currentFill"
                            />
                        </svg>
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
            </div>
            <ToastContainer />
        </Container>
    )
}
