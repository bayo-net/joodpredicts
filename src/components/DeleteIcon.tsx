'use client'

import Image from 'next/image'

interface DeleteIconProps {}

export const DeleteIcon: React.FC<DeleteIconProps> = () => {
    return (
        <Image
            src="/icons/delete.svg"
            width={12}
            height={12}
            alt="delete_icon"
            className="cursor-pointer"
        ></Image>
    )
}
