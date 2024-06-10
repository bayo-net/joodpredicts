'use client'

import { HTMLAttributes } from 'react'

interface Props extends HTMLAttributes<HTMLDivElement> {
    handleClose?: () => void
}

const Backdrop = ({ children, handleClose }: Props) => (
    <div
        className="
      z-50 fixed inset-0
      flex items-center justify-center
      bg-backdrop backdrop-filter backdrop-blur-sm
    "
        onClick={handleClose}
    >
        {children}
    </div>
)

export default Backdrop
