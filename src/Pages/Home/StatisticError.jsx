import React from 'react';

import errorSVG from '../../assets/JSON/wrong.json';
import Lottie from 'lottie-react';
import { useTranslation } from 'react-i18next';

export default function StatisticError() {

    const {t} = useTranslation();

    return <React.Fragment>

        <div className='
            w-full h-full col-span-3 p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
            flex flex-col items-center justify-center
        '>

            <Lottie className='w-28' animationData={errorSVG} loop={false} />
            <p className='text-xl font-semibold text-[var(--red-color)]'>{t('errorTableMsg')}</p>

        </div>

    </React.Fragment>

}
