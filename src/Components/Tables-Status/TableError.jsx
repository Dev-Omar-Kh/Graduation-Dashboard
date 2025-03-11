import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';
import Lottie from 'lottie-react';
import { PropTypes } from 'prop-types';
import { useTranslation } from 'react-i18next';

export default function TableError({icon, msg, isRed}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <tr className='border-t border-solid border-[var(--gray-color-1)]'>

            <td colSpan="100%" className={`text-xl font-semibold ${isRed ? 'text-[var(--red-color)]' : 'text-[var(--gray-color-2)]'}`}>

                <motion.div 
                    variants={Animations.parentVariants} initial='hidden' animate='visible' exit={'exit'}
                    className='w-full flex flex-col py-5 items-center justify-center overflow-hidden'
                >
                    <Lottie className='w-28' animationData={icon} loop={false} />
                    <motion.p variants={Animations.toTopVariants}>{t(msg)}</motion.p>
                </motion.div>

            </td>

        </tr>

    </React.Fragment>

}

TableError.propTypes = {
    icon: PropTypes.any.isRequired,
    msg: PropTypes.string.isRequired,
    isRed: PropTypes.bool.isRequired,
}