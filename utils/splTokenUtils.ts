// Fetches all the spl tokens from a wallet.
import {
    Connection,
    GetProgramAccountsFilter,
    PublicKey,
} from '@solana/web3.js'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { JOOD_MINT_ADDRESS, TOKEN_FEE, rpcEndPointUrl } from '@/constant'

export const fetchAllSplTokens = (wallet: string, connection: Connection) => {
    if (!wallet) {
        throw new Error('Please connect wallet and try again.')
    }
    return getTokenAccounts(wallet, connection)
}

const getTokenAccounts = async (
    wallet: string,
    solanaConnection: Connection
) => {
    const filters: GetProgramAccountsFilter[] = [
        {
            dataSize: 165,
        },
        {
            memcmp: {
                offset: 32, //location of our query in the account (bytes)
                bytes: wallet, //our search criteria, a base58 encoded string
            },
        },
    ]

    const accounts = await solanaConnection.getParsedProgramAccounts(
        TOKEN_PROGRAM_ID,
        { filters }
    )

    // accounts.forEach((account) => console.log(account))

    console.log(
        `Found ${accounts.length} token account(s) from wallet ${wallet}`
    )

    return accounts
}

export const getTokenExistsAndUiAmount = (accounts: any[]) => {
    for (let index in accounts) {
        if (
            accounts[index]?.account?.data?.parsed?.info?.mint ===
                JOOD_MINT_ADDRESS &&
            Math.round(
                accounts[index]?.account?.data?.parsed?.info?.tokenAmount
                    ?.uiAmount
            ) >= TOKEN_FEE
        ) {
            return true
        }
    }
    return false
}
