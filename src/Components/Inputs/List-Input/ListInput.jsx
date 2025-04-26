import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Animations from '../../../Animations/Animations';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import { PiWarningCircle } from "react-icons/pi";

export default function ListInput({ id, label, placeHolder, options, onSelect, onChange, onBlur, value }) {

    const {t, i18n} = useTranslation();

    // ======= handle-selected-list ======= //

    const [searchTerm, setSearchTerm] = useState(value || '');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const inputRef = useRef(null);
    const dropdownRef = useRef(null);

    useEffect(() => {
        setSearchTerm(value || '');
    }, [value]);

    const handleSearchChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        setFilteredOptions(options.filter(option =>
            option.toLowerCase().includes(value.toLowerCase())
        ));
        if (onChange) onChange(e);
    };

    const handleOptionClick = (option) => {
        setSearchTerm(option);
        setIsDropdownOpen(false);
        if (onSelect) onSelect(option);
        if (onChange) onChange({ target: { id, value: option } });
    };

    const handleClickOutside = (e) => {
        if (
            inputRef.current && !inputRef.current.contains(e.target) &&
            dropdownRef.current && !dropdownRef.current.contains(e.target)
        ) {
            setIsDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return <React.Fragment>

        <div className="relative w-full flex flex-col gap-1 group">

            <label 
                className={`
                    text-base font-medium 
                    ${searchTerm ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'}
                    duration-300 group-focus-within:text-[var(--blue-color)]
                `} 
                htmlFor={id}
            >
                {t(label)} :
            </label>

            <input id={id}
                type="text"
                value={value}
                ref={inputRef}
                className={`
                    w-full h-10 px-2.5 rounded-md border border-solid 
                    ${i18n.language === 'en' ? 'pr-10.5' : 'pl-10.5'} placeholder:text-[var(--gray-color)]
                    ${searchTerm ? 'border-[var(--blue-color)]' : 'border-[var(--gray-color-2)]'}
                    outline-0 duration-300 focus:border-[var(--blue-color)] text-base font-medium text-[var(--black-color)]
                `}
                onChange={handleSearchChange}
                onFocus={() => setIsDropdownOpen(true)}
                onBlur={onBlur}
                placeholder={t(placeHolder)}
            />

            {/* ====== arrow ====== */}

            <div className={`
                absolute bottom-0 h-10 flex items-center justify-center 
                ${i18n.language === 'en' ? 'right-2.5' : 'left-2.5'}
            `}>
                <IoIosArrowForward 
                    className={`
                        text-2xl duration-300 
                        ${i18n.language === 'en' ? 'group-focus-within:rotate-90' : 'group-focus-within:rotate-90 rotate-180'}
                        group-focus-within:text-[var(--blue-color)]
                        ${searchTerm ? 'text-[var(--blue-color)]' : 'text-[var(--gray-color-2)]'}
                    `} 
                />
            </div>

            {/* ====== list-options ====== */}

            <AnimatePresence>

                {isDropdownOpen && (

                    <motion.div 
                        ref={dropdownRef}
                        variants={Animations.displayList}
                        initial='hidden' animate='visible' exit='exit'
                        className='
                            absolute list-position w-full max-h-48
                            rounded-md border border-solid border-[var(--gray-color-3)] shadow-[0_0px_10px_var(--gray-color-3)]
                            bg-[var(--white-color)] overflow-hidden z-40
                        '
                    >

                        {filteredOptions.length > 0 ? 
                            <ul className="w-full max-h-48 overflow-auto">

                                {filteredOptions.map((option, index) => (

                                    <li 
                                        key={index} 
                                        onClick={() => handleOptionClick(option)}
                                        className={`
                                            w-full p-2.5 border-b border-solid border-[var(--gray-color-3)] cursor-pointer
                                            text-base text-[var(--gray-color-2)]
                                            ${searchTerm === option ? 'bg-[var(--blue-color)] text-[var(--white-color)]' : ''}
                                            duration-300 hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                                        `}
                                    >
                                        {option}
                                    </li>

                                ))}

                            </ul> 
                            : 
                            <div 
                                className='
                                    w-full p-2.5 border-b border-solid border-[var(--gray-color-3)]
                                    flex items-center justify-center gap-2.5 
                                    cursor-pointer text-base text-[var(--gray-color-2)]
                                '
                            >
                                <PiWarningCircle className='text-2xl' />
                                <p>{t('noOptionsMatched')}</p>
                            </div>
                        }

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    </React.Fragment>
}
