import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function StatisticLoading() {

    return <React.Fragment>

        <motion.div 
            variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible'
            className='p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)] flex flex-col gap-5'
        >

            <div className='w-full flex items-center justify-between gap-5'>

                <motion.div variants={Animations.loadingVariants} className='w-2/3 h-5 rounded-4xl bg-[var(--gray-color-3)]'>
                </motion.div>

                <motion.div variants={Animations.loadingVariants} className='w-1/3 h-5 rounded-4xl bg-[var(--gray-color-3)]'>
                </motion.div>

            </div>

            <motion.div variants={Animations.loadingVariants} className='w-2/3 h-7 rounded-4xl bg-[var(--gray-color-3)]'>
            </motion.div>

            <motion.div variants={Animations.loadingVariants} className='w-2/3 h-4 rounded-4xl bg-[var(--gray-color-3)]'>
            </motion.div>

        </motion.div>

    </React.Fragment>

}
