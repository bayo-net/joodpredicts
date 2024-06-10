'use client'

import { merge } from '@/utils/utils'
import { Modal } from '../Modal'

interface ModalContainerProps {
    openModal?: any
    setOpenModal?: any
}

export const ModalContainer: React.FC<ModalContainerProps> = ({
    openModal = true,
    setOpenModal,
}) => {
    return <div></div>
}
