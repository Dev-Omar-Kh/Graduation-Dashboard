import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { IoCarSportOutline, IoClose, IoSettingsOutline, IoWarningOutline } from 'react-icons/io5';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LuClipboardList, LuUsers } from 'react-icons/lu';
import { MdOutlineAdminPanelSettings, MdOutlineLocalPolice } from "react-icons/md";
import Translate from '../Translate-Btn/Translate';
import { GiRank3 } from "react-icons/gi";
import { useTranslation } from 'react-i18next';
import { PropTypes } from 'prop-types';

import logo from '../../assets/Images/logo.png'
import miniLogo from '../../assets/Images/mini-logo.png';
import myImg from '../../assets/Images/pfp.jpg'

export default function SideBar({setDisplayNan}) {

    const {t} = useTranslation();

    const links = [

        {
            id: 1, 
            icon: <GoHome className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/', 
            title: t('homeWord')
        },

        {
            id: 4, 
            icon: <MdOutlineLocalPolice className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/officers', 
            title: t('officersWord')
        },

        {
            id: 3, 
            icon: <MdOutlineAdminPanelSettings className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/admins', 
            title: t('adminsWord')
        },

        {
            id: 2,
            icon: <IoCarSportOutline className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />,
            link: '/V-Management', 
            title: t('vehicleManagementWord')
        },

        {
            id: 5, 
            icon: <HiOutlineDocumentReport className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/V-Reports', 
            title: t('violationReportsWord')
        },

        {
            id: 6, 
            icon: <LuClipboardList className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/adult-logs', 
            title: t('auditLogWord')
        },

        {
            id: 7, 
            icon: <IoSettingsOutline className='text-xl max-[1120px]:text-2xl max-[940px]:text-xl' />, 
            link: '/setting', 
            title: t('settingWord')
        },

    ];

    return <React.Fragment>

        <div className='w-full h-full py-5 px-5'>

            <div className='w-full flex items-center justify-center pb-2.5 max-[940px]:justify-between'>

                <Link className='w-full flex items-center justify-center pb-2.5 max-[940px]:justify-between max-[940px]:w-fit' to={'/'}>

                    <picture>
                        <source media="(min-width: 1120px)" srcSet={logo} />
                        <source media="(min-width: 940px)" srcSet={miniLogo} />
                        <img 
                            className='h-16 pointer-events-none' 
                            src={logo} 
                            alt="logo" 
                        />
                    </picture>

                </Link>

                <div 
                    onClick={() => setDisplayNan(false)}
                    className='
                        w-10 h-10 hidden items-center justify-center rounded-full 
                        bg-[var(--gray-color-3)] max-[940px]:flex
                    '
                >
                    <IoClose className='text-3xl text-[var(--blue-color)]' />
                </div>

            </div>

            <ul className='
                w-full h-[calc(100vh-7.125rem)] py-5 flex flex-col gap-2.5 overflow-y-auto
                hidden_scroll
            '>

                {links.map(link => <li key={link.id} className='w-full'>
                    <NavLink to={link.link} onClick={() => setDisplayNan(false)} className='
                        w-full py-2.5 px-5 flex items-center gap-2.5
                        max-[1120px]:justify-center max-[940px]:justify-start
                        text-[var(--gray-color-2)] rounded-md text-base duration-300
                        hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                    '>
                        {link.icon}
                        <p className='font-medium max-[1120px]:hidden max-[940px]:block'>{link.title}</p>
                    </NavLink>
                </li>)}

                <li className='w-full'>
                    <NavLink to={'/admin-profile'} className='
                        hidden w-full py-2.5 px-5 items-center gap-2.5 
                        text-[var(--gray-color-2)] rounded-md text-base duration-300
                        hover:bg-[var(--blue-color)] hover:text-[var(--white-color)] max-[940px]:flex
                    '>
                        <img className='w-5 h-5 rounded-full object-cover' src={myImg} alt="my pfp" />
                        <p className='font-medium'>Omar Khaled</p>
                    </NavLink>
                </li>

                <Translate setDisplayNan={setDisplayNan} />

            </ul>

        </div>

    </React.Fragment>

}

SideBar.propTypes = {
    setDisplayNan: PropTypes.func.isRequired,
}