import React from 'react';
import { IoIosSearch } from 'react-icons/io';

import pfpImg from '../../assets/Images/pfp.jpg';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { IoList } from 'react-icons/io5';
import { PropTypes } from 'prop-types';

export default function Header({setDisplayNan}) {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='w-full h-full px-[4.5%] py-4 flex items-center justify-between gap-5'>

            <form className='
                w-72 h-full flex items-center gap-2.5 p-2.5
                rounded-md border border-solid border-[var(--gray-color)] duration-300
                focus-within:border-[var(--blue-color)]
                focus-within:[&>label]:text-[var(--blue-color)]
            '>
                <label className='
                    text-2xl text-[var(--gray-color)] duration-300
                ' htmlFor="search"><IoIosSearch /></label>
                <input 
                    className='w-full text-base text-[var(--black-color)] placeholder:text-[var(--gray-color)] outline-0'
                    type="text" placeholder={`${t('searchWord')}...`}
                />
            </form>

            <Link className='flex items-center gap-5 max-[940px]:hidden'>
                <p className='text-base text-[var(--gray-color-2)]'>Omar Khaled</p>
                <img className='w-9 h-9 rounded-full object-cover' src={pfpImg} alt={"pfpImg"} />
            </Link>

            <div className='hidden h-10 px-1 items-center justify-center rounded-md bg-[var(--gray-color-3)] max-[940px]:flex'>
                <IoList 
                    onClick={() => setDisplayNan(prev => !prev)}
                    className='text-3xl max-[400px]:text-3xl text-[var(--blue-color)]' 
                />
            </div>

        </div>

    </React.Fragment>

}

Header.propTypes = {
    setDisplayNan: PropTypes.func.isRequired,
}