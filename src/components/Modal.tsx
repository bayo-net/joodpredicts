'use client'

import { TOKEN_FEE } from '@/constant'
import {
    Transition,
    Dialog,
    TransitionChild,
    DialogPanel,
    DialogTitle,
    Description,
} from '@headlessui/react'

interface ModalProps {
    isOpen: any
    onClose: any
    setOpenModal: any
    setUserApprovedTrans: any
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    setOpenModal,
    setUserApprovedTrans,
}) => {
    return (
        <>
            {isOpen && (
                <Transition
                    show={isOpen}
                    enter="duration-300 ease-out"
                    enterFrom="opacity-0 scale-80"
                    enterTo="opacity-100 scale-100"
                    leave="duration-500 ease-out"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-0"
                >
                    <Dialog
                        onClose={() => setOpenModal(false)}
                        className="relative z-50 transition"
                    >
                        <div
                            className="fixed inset-0 bg-black/50"
                            aria-hidden="true"
                        />
                        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
                            <TransitionChild
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 transform-[scale(95%)]"
                                enterTo="opacity-100 transform-[scale(100%)]"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 transform-[scale(100%)]"
                                leaveTo="opacity-0 transform-[scale(95%)]"
                            >
                                <DialogPanel
                                    className="w-full max-w-md rounded-xl p-6 backdrop-blur-3xl border-[0.5px]
                border-[#407ED2]"
                                >
                                    <DialogTitle className="font-bold text-center">
                                        Charges for saving bracket!
                                    </DialogTitle>
                                    <Description className="text-justify mt-3">{`For saving your bracket, ${TOKEN_FEE} $JOOD is needed in the wallet.
                                Confirm initiating a transaction?`}</Description>
                                    <div className="flex justify-end gap-4 mt-4">
                                        <button
                                            onClick={() => setOpenModal(false)}
                                            className="px-3 py-2 bg-red-600 rounded-lg"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={() => {
                                                setUserApprovedTrans(true)
                                                setOpenModal(false)
                                            }}
                                            className="px-3 py-2 bg-green-600 rounded-lg"
                                        >
                                            Accept
                                        </button>
                                    </div>
                                </DialogPanel>
                            </TransitionChild>
                        </div>
                    </Dialog>
                </Transition>
            )}
        </>
    )
}
