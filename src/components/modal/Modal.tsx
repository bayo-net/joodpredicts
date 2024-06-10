'use client'

import {
    Dispatch,
    FC,
    HTMLAttributes,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react'
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'
import Backdrop from './Backdrop'
import ModalContent from './ModalContent'

interface Props extends HTMLAttributes<HTMLDivElement> {
    isOpen: boolean
    handleClose: () => void
    hideCloseButton?: boolean
    backdropDismiss?: boolean
    onExitComplete?: [string, Dispatch<SetStateAction<string>>]
    ariaLabel?: string
}

const Modal: FC<Props> = ({
    children,
    className,
    isOpen,
    handleClose,
    hideCloseButton,
    backdropDismiss = true,
    ariaLabel,
}: Props) => {
    const [isBrowser, setIsBrowser] = useState(false)

    const handleKeyDown = useCallback(
        (event: KeyboardEvent) => {
            if (!isOpen || event.key !== 'Escape') return

            handleClose()
        },
        [handleClose, isOpen]
    )

    useEffect(() => {
        if (!isOpen) return

        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = 'auto'
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [handleKeyDown, isOpen])

    useEffect(() => {
        setIsBrowser(true)
    }, [])

    if (!isBrowser) return <></>

    return createPortal(
        <div>
            {isOpen && (
                <Backdrop
                    handleClose={backdropDismiss ? handleClose : undefined}
                >
                    <FocusLock>
                        <ModalContent
                            className={className}
                            handleClose={
                                hideCloseButton ? undefined : handleClose
                            }
                            ariaLabel={ariaLabel}
                        >
                            {children}
                        </ModalContent>
                    </FocusLock>
                </Backdrop>
            )}
        </div>,
        document.getElementById('modal-portal')!
    )
}

export default Modal
