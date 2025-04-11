import React, { useState } from 'react'
import { useTranslation } from 'react-i18next';
import { Axios, getAllAdultLogs } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import Table from '../../Components/Table/Table';
import warningSVG from '../../assets/JSON/warning.json';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import WarnPopUp from '../../Components/Pop-Up/WarnPopUp';
import { IoBanSharp } from 'react-icons/io5';

export default function AuditLogs() {

    const { t, i18n } = useTranslation();

    // ====== get-adult-logs-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(getAllAdultLogs);
        return data
    }

    const { data, error, isLoading } = useQuery({queryKey: ["getAllAdultLogs"], queryFn: getApiData});

    // ====== handle-ban-click ====== //

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLog, setSelectedLog] = useState(null);

    const handleBanClick = (log) => {
        setSelectedLog(log);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {
        if (selectedLog) {
            // Your existing ban logic here
            setIsModalOpen(false);
            setSelectedLog(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedLog(null);
    };

    return <React.Fragment>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('clearAuditLogTitle')}
            message={t('clearAuditLogMessage')}
        />

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex items-center justify-between flex-wrap gap-5'>

                <div>
                    <h3 className='text-4xl font-medium text-[var(--black-color)]'>{t('auditLogsTitle')}</h3>
                    <p className='pt-0.5 text-base text-[var(--gray-color-2)]'>{t('auditLogsSlogan')}</p>
                </div>

                <button className='
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                    text-base text-[var(--white-color)] font-medium cursor-pointer
                '>
                    <IoBanSharp className='text-xl' />
                    <p>{t('clearAuditLogWord')}</p>
                </button>

            </div>

            <div className='
                w-full rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <Table
                    columns={['performedByWord', 'actionWord', 'dateWord', 'roleWord', 'profileWord']}
                    data={data?.slice(0, 10)}
                    isLoading={isLoading}
                    isError={error}
                    emptyMessage="noAdultLogsYet"
                    emptyIcon={warningSVG}
                    actions={true}
                    renderRow={(log) => (
                        <React.Fragment>
                            <td className='p-2.5 whitespace-nowrap'>{log.performedBy.name}</td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>{log.action}</td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                <div className='flex items-center justify-center gap-1'>
                                    <p>{log.date.split('T')[0].split('-').reverse().join('/')}</p>
                                    <p>({log.date.split('T')[1].split('.')[0]})</p>
                                </div>
                            </td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                {log.performedBy.role === 'Admin' && 
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--gray-color-3)]
                                            font-medium text-[var(--blue-color)]
                                        '>{log.performedBy.role}</p>
                                    </div>
                                }
                                {log.performedBy.role === 'Officer' &&
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                            font-medium text-[var(--gray-color)]
                                        '>{log.performedBy.role}</p>
                                    </div>
                                }
                            </td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                <Link 
                                    to={
                                        log.performedBy.role === 'Admin' ? `/admins/profile/${log.performedBy.id}` 
                                        : `/officers/profile/${log.performedBy.id}`
                                    }
                                    className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'
                                >
                                    <p>{t('viewProfileWord')}</p>
                                    <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                </Link>
                            </td>
                        </React.Fragment>
                    )}
                    onActionClick={(log) => (
                        <React.Fragment>
                            <div className='flex items-center justify-center'>
                                <button 
                                    onClick={() => handleBanClick(log)}
                                    className='
                                        flex items-center justify-center p-2.5 rounded-md 
                                        bg-[var(--gray-color-3)] text-[var(--red-color)] 
                                        cursor-pointer duration-300 hover:bg-[var(--red-color)] 
                                        hover:text-[var(--white-color)]
                                '><IoBanSharp /></button>
                            </div>
                        </React.Fragment>
                    )}
                />

            </div>

        </section>

    </React.Fragment>

}
