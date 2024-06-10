'use client'

import { TeamCard } from './TeamCard'

interface QuarterFinalsStandingsProps {
    allUserSelections: any
    setAllUserSelections: any
}

export const QuarterFinalsStandings: React.FC<QuarterFinalsStandingsProps> = ({
    allUserSelections,
    setAllUserSelections,
}) => {
    const handleClick = () => {}

    const checkIfAlreadySelected = () => {}

    const firstTeamPropsVal = () => {
        return {}
    }

    const secondTeamPropsVal = () => {
        return {}
    }

    return (
        <div className="flex flex-row justify-between gap-2 relative">
            <TeamCard
                {...firstTeamPropsVal()}
                handleClick={handleClick}
                checkIfAlreadySelected={checkIfAlreadySelected}
            />
            <div
                className="
            absolute text-[#949494] font-[500] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0A0A0A]
            flex
            justify-center
            items-center
            border-[0.5px]
            rounded-lg
            px-3
            py-2
            border-[#242424]"
            >
                vs
            </div>
            <TeamCard
                {...secondTeamPropsVal()}
                handleClick={handleClick}
                checkIfAlreadySelected={checkIfAlreadySelected}
            />
        </div>
    )
}
