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
        <div className="flex gap-3 py-4 items-center mt-4">
            <div className="bg-gradient-to-r from-violet-600 to-indigo-800 w-[40px] h-[40px] rounded-lg flex justify-center items-center flex-shrink-0 border-violet-400 border">
                {count}
            </div>
            <div className="flex flex-col flex-grow flex-shrink-0">
                <h1 className="text-xl">{headingText}</h1>
                <h3 className="text-sm text-gray-600">{subHeadingText}</h3>
            </div>
            <div className="h-[10px] rounded-full w-full bg-gradient-to-r from-violet-800 to-transparent" />
        </div>
    )
}
