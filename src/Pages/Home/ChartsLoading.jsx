import React from 'react';
import FadeLoader from 'react-spinners/esm/FadeLoader';

export default function ChartsLoading() {

    return <React.Fragment>

        <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center bg-[var(--white-opacity-color)]'>

            <FadeLoader color='var(--gray-color-2)' radius={15} />

        </div>

    </React.Fragment>

}
