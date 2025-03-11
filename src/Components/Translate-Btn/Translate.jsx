import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io'
import { IoLanguage } from 'react-icons/io5'
import Flag from 'react-world-flags'
import Animations from '../../Animations/Animations';
import { PropTypes } from 'prop-types';

export default function Translate({setDisplayNan}) {

    // ====== display-langs ====== //

    const [displayLangs, setDisplayLangs] = useState(false);

    const toggleLangsList = () => {

        setDisplayLangs(prev => !prev);

    }

    const langListRef = useRef(null);

    const handleClickOutside = useCallback((event) => {

        if (langListRef.current && !langListRef.current.contains(event.target)) {
            setDisplayLangs(false);
        }

    }, []);

    useEffect(() => {

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };

    }, [handleClickOutside]);

    // ====== change-language ====== //

    const { t, i18n } = useTranslation();

    const changeLanguage = (lang) => {

        i18n.changeLanguage(lang);
        localStorage.setItem('language', lang);

        setTimeout(() => {
            setDisplayLangs(false);
        }, 0); 

    };

    // ====== languages-data ====== //

    const languagesData = [

        {id: 1, name: 'arWord', code: 'eg', lang: 'ar'},
        {id: 2, name: 'enWord', code: 'us', lang: 'en'}

    ]

    return <React.Fragment>

        <div ref={langListRef} onClick={toggleLangsList} className='relative w-full rounded-md bg-[var(--gray-color-3)]'>

            <button className='
                py-2.5 px-5 w-full flex items-center justify-between 
                max-[1120px]:justify-center max-[940px]:justify-between
                gap-2.5 text-[var(--blue-color)] cursor-pointer
            '>
                <div className='flex items-center gap-2.5'>
                    <IoLanguage className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />
                    <p className='text-base font-medium max-[1120px]:hidden max-[940px]:block'>{t('languageWord')}</p>
                </div>
                <IoIosArrowForward className={`
                    text-xl duration-300 max-[1120px]:text-2xl max-[940px]:text-xl
                    ${i18n.language === 'ar' ? 'rotate-y-180' : ''}
                    ${displayLangs ? i18n.language === 'en' ? 'rotate-90' : '-rotate-90' : ''}
                `} />
            </button>

            <AnimatePresence>

                {displayLangs && <motion.ul 
                    variants={Animations.displayList} initial='hidden' animate='visible' exit={'exit'}
                    className='list_top left-0 w-full absolute rounded-md bg-[var(--gray-color-3)] overflow-hidden'
                >

                    {languagesData.map(language => <li key={language.id} onClick={() => setDisplayNan(false)} className={`
                            w-full px-5 py-2.5 flex items-center gap-2.5 cursor-pointer duration-300 
                            max-[1120px]:justify-center max-[940px]:justify-start
                            text-[var(--gray-color-2)] hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                            ${i18n.language === language.lang ? 'bg-[var(--blue-color)] text-[var(--white-color)]' : ''}
                        `}
                        onClick={() => changeLanguage(language.lang)}
                    >
                        <Flag className='w-7' code={language.code} />
                        <p className='text-base font-medium max-[1120px]:hidden max-[940px]:block'>{t(language.name)}</p>
                    </li>)}

                </motion.ul>}

            </AnimatePresence>

        </div>

    </React.Fragment>

}

Translate.propTypes = {
    setDisplayNan: PropTypes.func.isRequired,
}