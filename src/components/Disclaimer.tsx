'use client'

import { GiCancel } from 'react-icons/gi'
import { SiTicktick } from 'react-icons/si'

interface DisclaimerProps {
    handleClose: () => void
    handleApprove: () => void
}

export const Disclaimer: React.FC<DisclaimerProps> = ({
    handleClose,
    handleApprove,
}) => {
    return (
        <div
            className="
            flex
            flex-col
            justify-center
            items-center
            "
        >
            <h1 className="text-xl font-bold uppercase text-center text-gray-400">
                Hold $JOOD to participate
            </h1>
            <h1 className="text-wrap mt-2 p-5">
                This will cost 2,000 $JOOD to submit your bracket and
                participate in the prizes. Please click Agree to proceed with
                transaction
            </h1>
            <div className="flex flex-row justify-end mt-4 w-full gap-3">
                <button
                    className="rounded-lg px-3 py-2 
                    bg-gradient-to-r from-red-500 to-red-800
                    font-semibold
                    text-sm
                    text-[#F9F9F9]
                    border-[0.5px]
                    border-red-400
                    flex flex-row items-center gap-2"
                    onClick={handleClose}
                >
                    <GiCancel />
                    Cancel
                </button>
                <button
                    className="rounded-lg px-3 py-2 bg-gradient-to-r from-[#004AAD] to-[#001E47]
                    font-semibold
                    text-sm
                    text-[#F9F9F9]
                    border-[0.5px]
                    border-[#407ED2] flex flex-row items-center gap-2"
                    onClick={() => handleApprove()}
                >
                    Agree
                    <SiTicktick />
                </button>
            </div>
        </div>
    )
}
