'use client'

interface HeadingProps {
    count: number
    headingText: string
    subHeadingText: string
}

export const Heading: React.FC<HeadingProps> = ({
    count,
    headingText,
    subHeadingText,
}) => {
    return (
        <div className="flex gap-3 py-4 items-center mt-4 overflow-x-scroll sm:overflow-hidden">
            <div className="bg-gradient-to-r from-[#004AAD] to-[#001E47] w-[44px] h-[44px] rounded-lg flex justify-center items-center flex-shrink-0 border-[0.5px] border-[#407ED2]">
                {count}
            </div>
            <div className="flex flex-col flex-grow flex-shrink-0">
                <h1 className="text-xl">{headingText}</h1>
                <h3 className="text-sm text-gray-600">{subHeadingText}</h3>
            </div>
            <div className="h-[10px] rounded-full w-full bg-gradient-to-r from-[#004AAD] to-[#0A0A0A]" />
        </div>
    )
}
