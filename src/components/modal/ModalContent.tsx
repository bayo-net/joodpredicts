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
        {handleClose && (
            <button
                className="absolute top-0 right-0 p-7"
                onClick={handleClose}
                aria-label={`Close ${ariaLabel || 'dialog'}`}
            >
                <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 512 512"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M289.94 256l95-95A24 24 0 00351 127l-95 95-95-95a24 24 0 00-34 34l95 95-95 95a24 24 0 1034 34l95-95 95 95a24 24 0 0034-34z" />
                </svg>
            </button>
        )}
    </div>
)

export default ModalContent
