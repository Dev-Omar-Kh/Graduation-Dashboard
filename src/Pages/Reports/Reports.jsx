import React, { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Filter from '../../Components/Filter-Button/Filter';
import { RiAlarmWarningLine } from "react-icons/ri";
import { MdOutlineFilterList } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { FiEdit } from 'react-icons/fi';
import { IoBanSharp } from 'react-icons/io5';
import { Axios, getAllReports } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import TableLoading from '../../Components/Tables-Status/TableLoading';
import TableError from '../../Components/Tables-Status/TableError';
import WarnPopUp from '../../components/Pop-Up/WarnPopUp';

import warningSVG from '../../assets/JSON/warning.json';
import wrongSVG from '../../assets/JSON/wrong.json';

export default function Reports() {

    const {t, i18n} = useTranslation();

    // ====== get-reports-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(getAllReports);
        return data
    }

    const { data, error, isLoading } = useQuery({queryKey: ["getAllReports"], queryFn: getApiData});

    // ====== filters-data ====== //

    const [filters, setFilters] = useState({
        priority: 'allReportsWord',
        status: 'allStatusWord'
    });
    const [filteredArray, setFilteredArray] = useState(data);

    const statusData = ['allStatusWord', 'reviewedWord', 'unreviewedWord'];
    const reportsTypes = useMemo(() => {
        return ['allReportsWord', ...new Set(data?.map(item => item.priority) || [])];
    }, [data]);

    useEffect(() => {
    
        if (data) {

            const filteredData = data.filter(officer => {
                const priorityMatch = filters.priority === 'allReportsWord' || officer.priority === filters.priority;
                const statusMatch = filters.status === 'allStatusWord' ||
                (filters.status === 'reviewedWord' && officer.isRead) ||
                (filters.status === 'unreviewedWord' && !officer.isRead);
                return priorityMatch && statusMatch
            });

            setFilteredArray(filteredData);

        }

    }, [filters, data]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    const handleBanClick = (report) => {
        setSelectedReport(report);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {
        if (selectedReport) {
            // Your existing ban logic here
            setIsModalOpen(false);
            setSelectedReport(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedReport(null);
    };

    return <React.Fragment>

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex items-center justify-between flex-wrap gap-5'>

                <div>
                    <h3 className='text-4xl font-medium text-[var(--black-color)]'>{t('reportsViewWord')}</h3>
                    <p className='pt-0.5 text-base text-[var(--gray-color-2)]'>{t('reportSubTitle')}</p>
                </div>

            </div>

            <div className='
                w-full flex items-center justify-end gap-5 flex-wrap 
                max-[775px]:grid max-[775px]:grid-cols-1
            '>

                <Filter 
                    icon={<RiAlarmWarningLine className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={reportsTypes} filterKey="priority"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

                <Filter 
                    icon={<MdOutlineFilterList className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={statusData} filterKey="status"
                    onFilterChange={(key, value) => setFilters(prev => ({ ...prev, [key]: value }))}
                />

            </div>

            <div className='
                w-full rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <table className='w-full border-collapse'>

                    <thead>

                        <tr className="text-base text-[var(--black-color)] text-center">

                            <th className="px-2.5 py-5 whitespace-nowrap">{t('titleWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('officerWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('dateWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('priorityWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('statusWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('detailsWord')}</th>
                            <th className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                            `}>{t('actionsWord')}</th>

                        </tr>

                    </thead>

                    <tbody className='p-10'>

                        {isLoading && <TableLoading />}

                        {!isLoading && error && <TableError isRed={true} icon={wrongSVG} msg={'errorTableMsg'} />}

                        {!isLoading && !error && data &&  filteredArray && filteredArray.length > 0 && 
                            filteredArray.map(report => <tr key={report.id} className='
                                border-t border-solid border-[var(--gray-color-1)]
                                text-base font-normal text-[var(--gray-color-2)] text-center
                                duration-300 hover:bg-[var(--gray-opacity-color-3)] cursor-pointer
                            '>

                                <td className='p-2.5 whitespace-nowrap'>{report.title}</td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>{report.officer.name.split(' ').slice(0, 2).join(' ')}</td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>
                                    {report.date.split('T').join('/').split('/')[0]}
                                </td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>

                                    {report.priority === 'medium' && 
                                        <div className='w-full flex items-center justify-center'>
                                            <p className='
                                                w-fit px-2 rounded-4xl bg-[var(--yellow-opacity-color)]
                                                font-medium text-[var(--yellow-color)]
                                            '>{report.priority}</p>
                                        </div>
                                    }

                                    {report.priority === 'high' && 
                                        <div className='w-full flex items-center justify-center'>
                                            <p className='
                                                w-fit px-2 rounded-4xl bg-[var(--red-opacity-color)]
                                                font-medium text-[var(--red-color)]
                                            '>{report.priority}</p>
                                        </div>
                                    }

                                    {report.priority === 'low' && 
                                        <div className='w-full flex items-center justify-center'>
                                            <p className='
                                                w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                                font-medium text-[var(--gray-color)]
                                            '>{report.priority}</p>
                                        </div>
                                    }

                                </td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>

                                    {report.isRead && 
                                        <div className='w-full flex items-center justify-center'>
                                            <p className='
                                                w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                                font-medium text-[var(--gray-color)]
                                            '>{t('reviewedWord')}</p>
                                        </div>
                                    }

                                    {!report.isRead && 
                                        <div className='w-full flex items-center justify-center'>
                                            <p className='
                                                w-fit px-2 rounded-4xl bg-[var(--green-opacity-color)]
                                                font-medium text-[var(--green-color)]
                                            '>{t('unreviewedWord')}</p>
                                        </div>
                                    }

                                </td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>
                                    <Link 
                                        to={`report/${report.id}`}
                                        className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'
                                    >
                                        <p>{t('expandWord')}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </Link>
                                </td>
                                <td className={`
                                    ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                    border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                `}>
                                    <div className='flex items-center justify-center gap-2.5'>

                                        <button className='
                                            p-2.5 rounded-md bg-[var(--gray-color-3)]
                                            text-[var(--blue-color)] cursor-pointer duration-300
                                            hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                                        '><FiEdit /></button>

                                        <button 
                                            onClick={() => handleBanClick(report)}
                                            className='
                                                p-2.5 rounded-md bg-[var(--gray-color-3)]
                                                text-[var(--red-color)] cursor-pointer duration-300
                                                hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                        '><IoBanSharp /></button>

                                    </div>
                                </td>

                            </tr>)
                        }

                        {!isLoading && !error && data && filteredArray && filteredArray.length === 0 &&
                            <TableError isRed={false} icon={warningSVG} msg={'officersMatchedError'} />
                        }

                    </tbody>

                </table>

            </div>

        </section>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('banReportTitle')}
            message={t('banReportMessage')}
        />

    </React.Fragment>

}
