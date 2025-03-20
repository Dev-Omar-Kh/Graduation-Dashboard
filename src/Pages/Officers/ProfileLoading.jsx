import React from 'react'
import { motion } from 'framer-motion';
import Animations from '../../Animations/Animations';

export default function ProfileLoading() {

    return <React.Fragment>

        <motion.div variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible' className='
            w-full p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
            flex items-center gap-5 max-[770px]:flex-col max-[770px]:items-start
        '>

            <motion.div variants={Animations.loadingVariants} className='
                w-52 h-52 rounded-full overflow-hidden max-[430px]:w-28 max-[430px]:h-28 max-[430px]:m-auto
                bg-[var(--gray-color-1)]
            '>
            </motion.div>

            <div className='w_cont-200 flex flex-col gap-2.5'>

                <motion.div 
                    variants={Animations.loadingVariants} 
                    className='w-1/4 h-7 bg-[var(--gray-color-1)] rounded-4xl max-[770PX]:w-3/4'
                >
                </motion.div>

                <motion.div 
                    variants={Animations.loadingVariants} 
                    className='w-1/5 h-5 rounded-4xl bg-[var(--gray-color-1)] max-[770PX]:w-1/2'
                >
                </motion.div>

                <div className='w-full grid grid-cols-2 gap-2.5 max-[550px]:grid-cols-1'>

                    {Array.from({length: 4}).map( (_, idx) =>
                        <motion.div 
                            key={idx} variants={Animations.loadingVariants} 
                            className='h-16 rounded-md bg-[var(--gray-color-1)]'
                        >
                        </motion.div>
                    )}

                </div>

            </div>

        </motion.div>

        <motion.div variants={Animations.parentVariantsNoStagger} initial='hidden' animate='visible' className='
            w-full grid grid-cols-4 gap-5 max-[985px]:grid-cols-2 max-[520px]:grid-cols-1
        '>

            {Array.from({length: 4}).map( (_, idx) =>
                <div 
                    key={idx}
                    className='
                        p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                        flex flex-col gap-2.5
                    '
                >

                    <motion.div variants={Animations.loadingVariants} className='w-3/4 h-7 bg-[var(--gray-color-1)] rounded-4xl'>
                    </motion.div>

                    <motion.div variants={Animations.loadingVariants} className='w-1/2 h-10 bg-[var(--gray-color-1)] rounded-4xl'>
                    </motion.div>

                </div>
            )}

        </motion.div>

    </React.Fragment>

}
