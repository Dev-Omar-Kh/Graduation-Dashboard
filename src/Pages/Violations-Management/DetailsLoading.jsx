import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function DetailsLoading() {

    return <React.Fragment>

        <motion.div variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible' className='
            p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
            shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
        '>

            <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                <motion.div variants={Animations.loadingVariants} className='w-10 h-10 rounded-4xl bg-[var(--gray-color-1)]'>
                </motion.div>
                <motion.div variants={Animations.loadingVariants} className='w-60 h-10 rounded-4xl bg-[var(--gray-color-1)]'>
                </motion.div>
            </div>

            <div className='w-full grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                {Array.from({length: 4}).map( (_, idx) =>
                    <motion.div key={idx} variants={Animations.loadingVariants} className='h-16 rounded-md bg-[var(--gray-color-1)]'>
                    </motion.div>
                )}

            </div>

        </motion.div>

    </React.Fragment>

}
