'use client'

interface LoadingSpinnerProps {}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({}) => {
    return (
        <div className="bg-transparent relative rounded-lg min-h-[30vh]">
            <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
                <div className="flex justify-center items-center h-screen">
                    <div className="rounded-full h-20 w-20 bg-violet-800 animate-ping"></div>
                </div>
                <p>
                    Please be patient and donot close this page, it can take up
                    to 30 seconds
                </p>
            </div>
        </div>
    )
}
