import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';
import Animations from '../../Animations/Animations';

export default function WarnPopUp({ isOpen, onClose, onConfirm, title, message }) {

    const { t } = useTranslation();

    return <React.Fragment>

        <AnimatePresence>

            {isOpen && (

                <motion.div
                    variants={Animations.parentVariants} initial="hidden" animate="visible" exit="exit"
                    className="w-full h-full common-p fixed inset-0 z-50 flex items-center justify-center bg-[var(--black-opacity-color)]"
                >

                    <motion.div
                        variants={Animations.scaleVariants}
                        className="w-md max-w-full p-5 bg-[var(--salt-color)] flex flex-col gap-5 rounded-md"
                    >

                        <div className="flex items-center justify-between ">

                            <h3 className="text-2xl font-semibold text-[var(--blue-color)]">{t(title)}</h3>

                            <button
                                onClick={onClose}
                                className="
                                    p-1 bg-[var(--gray-color-3)] 
                                    rounded-full w-8 h-8 flex items-center justify-center text-[var(--blue-color)] cursor-pointer
                                    duration-300 hover:bg-[var(--gray-color-1)]
                                "
                            >
                                <IoClose className="text-2xl" />
                            </button>

                        </div>

                        <div className='w-full h-[0.0625rem] bg-[var(--gray-color-1)]'></div>

                        <p className="text-base text-[var(--gray-color-2)]">{t(message)}</p>

                        <div className='w-full h-[0.0625rem] bg-[var(--gray-color-1)]'></div>

                        <div className="flex justify-end gap-4">

                            <button
                                onClick={onClose}
                                className="
                                    px-4 py-1 text-base font-medium bg-[var(--gray-color-3)] rounded-md cursor-pointer
                                    text-[var(--blue-color)] duration-300 hover:bg-[var(--gray-color-1)]
                                "
                            >
                                {t('cancelWord')}
                            </button>

                            <button
                                onClick={onConfirm}
                                className="
                                    px-4 py-1 text-base font-medium 
                                    text-[var(--white-color)] bg-[var(--red-color)] rounded-md cursor-pointer
                                "
                            >
                                {t('confirmWord')}
                            </button>

                        </div>

                    </motion.div>

                </motion.div>

            )}

        </AnimatePresence>

    </React.Fragment>

}

WarnPopUp.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
}; 