import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Animations from '../../../Animations/Animations';
import LoadingInput from './LoadingInput';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useTranslation } from 'react-i18next';


export default function Input({id, label, type, password, loading, placeHolder, width, onChange, onBlur, value}) {

    const {t, i18n} = useTranslation();

    const [hasValue, setHasValue] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        setHasValue(value && value.trim() !== '');
    }, [value]);

    const handleInputChange = (e) => {
        setHasValue(e.target.value.trim() !== '');
        if (onChange) onChange(e);
    };

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        setIsFocused(false);
        if (onBlur) onBlur(e);
    };

    // ====== handle-password-visibility ====== //

    const [passType, setPassType] = useState('password');

    const handlePasswordVisibility = () => {
        setPassType(prev => prev === 'password' ? 'text' : 'password') 
    }

    return <React.Fragment>

        <div className={`relative ${width ? width : 'w-full'} flex flex-col gap-1 group`}>

            <label 
                className={`
                    text-base font-medium 
                    ${hasValue ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'} 
                    duration-300 group-focus-within:text-[var(--blue-color)]
                `} 
                htmlFor={id}
            >{t(label)} :</label>

            <input id={id}
                type={password ? passType : type}
                placeholder={t(placeHolder)}
                className={`
                    w-full h-10 px-2.5 ${i18n.language === 'en' ? 'pr-10.5' : 'pl-10.5'} rounded-md border border-solid 
                    ${hasValue ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color-2)]'} 
                    placeholder:text-[var(--gray-color)]
                    outline-0 duration-300 focus:border-[var(--blue-color)] text-base font-medium text-[var(--black-color)]
                `}
                value={value}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />

            {/* ====== animations-on-focus ====== */}

            <AnimatePresence>

                {isFocused && loading && (
                    <motion.div 
                        variants={Animations.opacityVariants} initial='hidden' animate='visible' exit='exit'
                        className={`absolute bottom-4.25 ${i18n.language === 'en' ? 'right-2.5' : 'left-2.5'}`}
                    >
                        <LoadingInput />
                    </motion.div>
                )}

            </AnimatePresence>

            {/* ====== password-status ====== */}

            {password && (
                <div 
                    onClick={handlePasswordVisibility} 
                    className={`
                        absolute ${i18n.language === 'en' ? 'right-2.5' : 'left-2.5'}
                        bottom-0 text-2xl h-10 flex items-center duration-300
                        ${hasValue ? 
                            'text-[var(--blue-color)]' : (isFocused ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]')
                        } 
                        cursor-pointer
                    `}
                >
                    {passType === 'password' ? 

                        <motion.button 
                            key={'s1'} type='button' className='cursor-pointer' 
                            variants={Animations.opacityVariants} initial='hidden' animate='visible' 
                        >
                            <VscEye />
                        </motion.button> : 

                        <motion.button 
                            key={'h1'} className='cursor-pointer' type='button'
                            variants={Animations.opacityVariants} initial='hidden' animate='visible' 
                        >
                            <VscEyeClosed />
                        </motion.button>
                    }
                </div>
            )}

        </div>

    </React.Fragment>

}