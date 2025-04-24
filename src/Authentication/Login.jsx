import React from 'react';
import Input from '../Components/Inputs/Manual-Inputs/Input';
import Translate from '../Components/Translate-Btn/Translate';
import { useTranslation } from 'react-i18next';

import logoImg from '../assets/Images/logo.png'
import authBg from '../assets/Images/auth_bg.jpg';

export default function Login() {

    const {t, i18n} = useTranslation();

    return <React.Fragment>

        <section className='w-full h-screen overlay bg-cover bg-center' style={{backgroundImage: `url(${authBg})`}}>

            <div className='relative w-full h-full common-p flex items-center justify-center bg-[var(--blue-opacity-color)]'>

                <div className={`fixed top-5 ${i18n.language === 'en' ? 'right-[4.5%]' : 'left-[4.5%]'}`}>
                    <Translate />
                </div>

                <div className='w-lg p-5 flex flex-col items-center gap-5 bg-[var(--white-color)] rounded-md'>

                    <img className='w-fit h-14' src={logoImg} alt="logoImg" />

                    <form className='w-full flex flex-col gap-2.5' action="">

                        <Input 
                            id={'username'} label={'usernameWord'} type={'text'} password={false}
                            loading={true} placeHolder={'usernamePlaceholder'}
                        />

                        <Input 
                            id={'password'} label={'passwordWord'} type={'password'} password={true}
                            loading={false} placeHolder={'passwordPlaceholder'}
                        />

                        <button 
                            type='submit' 
                            className='
                                w-full h-10 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--white-color)]
                                cursor-pointer duration-300 hover:bg-[var(--blue-opacity-color)]
                            '
                        >
                            {t('loginWord')}
                        </button>

                    </form>

                </div>

            </div>

        </section>

    </React.Fragment>

}
