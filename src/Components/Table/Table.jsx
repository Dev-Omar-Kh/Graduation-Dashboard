import React from 'react';
import { useTranslation } from 'react-i18next';
import TableLoading from '../Tables-Status/TableLoading';
import TableError from '../Tables-Status/TableError';

export default function Table ({
    columns,
    data,
    isLoading,
    isError,
    emptyMessage,
    emptyIcon,
    renderRow,
    actions = false,
    onActionClick
}){
    const { t, i18n } = useTranslation();

    return (
        <div className='w-full overflow-auto hidden_scroll'>
            <table className='w-full border-collapse'>

                <thead>

                    <tr className="text-base text-[var(--black-color)] text-center">

                        {columns.map((column, index) => (
                            <th 
                                key={index}
                                className={`
                                    ${index !== 0 ? (i18n.language === 'en' ? 'border-l' : 'border-r') : ''} 
                                    border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                                `}
                            >
                                {t(column)}
                            </th>
                        ))}

                        {actions && (
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>
                                {t('actionsWord')}
                            </th>
                        )}

                    </tr>

                </thead>

                <tbody>

                    {isLoading && <TableLoading />}

                    {!isLoading && !isError && data && data.length > 0 && (

                        data.map((item, index) => (

                            <tr 
                                key={index} 
                                className='
                                    border-t border-solid border-[var(--gray-color-1)]
                                    text-base font-normal text-[var(--gray-color-2)] text-center
                                    duration-300 hover:bg-[var(--salt-color)] cursor-pointer
                                '
                            >

                                {renderRow(item)}

                                {actions && (
                                    <td className={`
                                        ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                        border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                    `}>
                                        {onActionClick(item)}
                                    </td>
                                )}

                            </tr>

                        ))

                    )}

                    {!isLoading && !isError && data && data.length === 0 && (
                        <TableError isRed={false} icon={emptyIcon} msg={emptyMessage} />
                    )}

                </tbody>

            </table>
        </div>
    );
};

// export default Table; 