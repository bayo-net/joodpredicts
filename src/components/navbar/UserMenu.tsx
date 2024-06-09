'use client'

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = () => {
    return (
        <div className="relative">
            <div className="flex flex-row items-center gap-2">
                <div
                    className="
                            hidden
                            md:block
                            font-semibold 
                            text-sm
                            px-3
                            py-2
                            transition
                            border-[0.5px]
                            border-[#242424]
                            bg-[#171616]
                            rounded-lg
                            cursor-pointer"
                >
                    EURO Cup 2024
                </div>
            </div>
        </div>
    )
}
