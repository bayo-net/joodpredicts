'use client'

import { merge } from '@/utils'

interface GroupStageCardProps {
    children: React.ReactNode
    checkIfAlreadySelected: any
    index: any
    handleSelection: any
}

export const GroupStageCard: React.FC<GroupStageCardProps> = ({
    children,
    checkIfAlreadySelected,
    index,
    handleSelection,
}) => {
    return (
        <button
            className={merge(
                `
                flex
                sm:flex-grow
                min-h-9
                bg-[#292727]
                rounded-md 
                hover:bg-[#1D2634]
                transition
                duration-300
                border-[#242424]
                hover:border-[#407ED2]
                border-[0.5px]
                relative
                `,
                checkIfAlreadySelected(index)
                    ? 'cursor-not-allowed bg-[#1D2634] border-[#407ED2]'
                    : 'cursor-pointer text-white'
            )}
            onClick={() => handleSelection(index)}
        >
            {children}
        </button>
    )
}
