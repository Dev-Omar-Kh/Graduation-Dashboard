import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import SideBar from '../Components/Sidebar/SideBar'
import Header from '../Components/Header/Header'
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Animations from '../Animations/Animations';

export default function MainLayout() {

    const{i18n} = useTranslation();

    const [displayNan, setDisplayNan] = useState(false);

    return <React.Fragment>

        <section className='w-full h-screen flex flex-wrap'>

            <nav className='
                w-72 h-full bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)] 
                max-[1120px]:w-28 max-[940px]:hidden
            '>
                <SideBar setDisplayNan={setDisplayNan} />
            </nav>

            <AnimatePresence>
                {displayNan && <motion.nav 
                    className='
                        hidden h-full bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)] 
                        max-[940px]:fixed max-[940px]:w-full z-50 max-[940px]:block
                    '
                    variants={i18n.language === 'en' ? Animations.displayNavEn : Animations.displayNavAr}
                    initial='hidden' animate='visible' exit={'exit'}
                >
                    <SideBar setDisplayNan={setDisplayNan} />
                </motion.nav>}
            </AnimatePresence>

            <section className='dashboard_width h-full overflow-hidden'>

                <header className='
                    h-[4.375rem] w-full bg-[var(--white-color)] 
                    border-b border-solid border-[var(--gray-color-3)] shadow-[0_0px_10px_var(--gray-color-3)]
                '>
                    <Header setDisplayNan={setDisplayNan} />
                </header>

                <main className='page_height w-full px-[4.5%] py-10 overflow-x-hidden overflow-y-auto'>
                    <Outlet />
                </main>

            </section>

        </section>

    </React.Fragment>

}
