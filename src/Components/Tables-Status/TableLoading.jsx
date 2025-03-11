import React from 'react';
import FadeLoader from 'react-spinners/esm/FadeLoader';

export default function TableLoading() {

    return <React.Fragment>

        <tr className='
            border-t border-solid border-[var(--gray-color-1)]
            text-base font-normal text-[var(--gray-color-2)] text-center
        '>
            <td colSpan="100%" className='py-5 text-xl font-semibold text-[var(--gray-color-2)]'>
                <div className='w-full flex items-center justify-center'>
                    <FadeLoader color='var(--gray-color-2)' radius={15} />
                </div>
            </td>
        </tr>

    </React.Fragment>

}
