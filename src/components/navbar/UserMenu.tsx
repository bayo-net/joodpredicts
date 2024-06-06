'use client'

interface UserMenuProps {}

export const UserMenu: React.FC<UserMenuProps> = () => {
    return (
        <div className="relative">
            <div className="flex flex-row items-center">
                <div
                    className="
                            hidden
                            md:block
                            font-semibold 
                            text-sm
                            py-3
                            px-4 
                            hover:text-orange-600
                            transition
                            cursor-pointer"
                >
                    EURO Cup 2024
                </div>
            </div>
        </div>
    )
}
