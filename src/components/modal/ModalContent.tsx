'use client'

import { FC, HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
    handleClose?: () => void
    ariaLabel?: string
}

const ModalContent: FC<Props> = ({
    className,
    children,
    handleClose,
    ariaLabel,
}: Props) => (
    <div
        tabIndex={-1}
        role="dialog"
        aria-modal={true}
        aria-label={ariaLabel}
        className={`relative ${
            className || 'm-5 p-5 bg-modal rounded-lg shadow-lg'
        }`}
        onClick={(event) => event.stopPropagation()}
    >
        {children}
    </div>
)

export default ModalContent
