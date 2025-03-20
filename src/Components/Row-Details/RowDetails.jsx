import React from 'react'
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';

export default function RowDetails({ title, content, link}) {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <div className={`p-2.5 flex flex-col gap-2 rounded-md bg-[var(--salt-color)]`}>

            <p className='text-sm font-medium text-[var(--black-color)]'>{t(title)} </p>

            <div className='w-full flex items-center justify-between flex-wrap gap-2.5'>
                <p className='text-base font-medium text-[var(--gray-color-2)]'>{t(content)}</p>
                {link && <Link 
                    to={`/officers/profile/${link}`} 
                    className='rounded-md text-[var(--blue-color)] flex items-center gap-1 text-sm'
                >
                    <p>{t('viewProfileWord')}</p>
                    <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                </Link>}
            </div>

        </div>

    </React.Fragment>

}

RowDetails.propTypes = {

    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    link: PropTypes.bool,

}
