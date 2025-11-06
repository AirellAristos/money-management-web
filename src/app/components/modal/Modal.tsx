import { AnimatePresence, motion } from "framer-motion"
import LoginModal from "./LoginModal"

interface ModalProps {
    activeModal: string | null
    onClose: () => void
}

export default function Modal({ activeModal, onClose }: Readonly<ModalProps>) {
    return (
        <AnimatePresence>
            {activeModal && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-xl p-6 w-[400px]"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {activeModal === "login" && <LoginModal />}
                        {activeModal === "about" && <p>About Modal Content</p>}
                        {activeModal === "contact" && <p>Contact Modal Content</p>}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
