import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RowDetails from '../../Components/Row-Details/RowDetails';
import { IoIosAddCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Axios, getAllOfficers, getAllVehicles } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import TableLoading from '../../Components/Tables-Status/TableLoading';
import TableError from '../../Components/Tables-Status/TableError';
import { IoBanSharp } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import ProfileLoading from './ProfileLoading';
import FullError from '../../Components/Error/FullError';

import officerImg from '../../assets/Images/officer.jpg';
import warningSVG from '../../assets/JSON/warning.json';

export default function OfficerProfile() {

    const {id} = useParams();
    const {t, i18n} = useTranslation();

    // ====== get-officer-vehicles ====== //

    const getOfficerData = async() => {
        const {data} = await Axios.get(`${getAllOfficers}/${Number(id)}`);
        return data
    }

    const officerRes = useQuery({queryKey: ["getOfficer", id], queryFn: getOfficerData});

    // ====== get-officer-vehicles ====== //

    const getViolationsData = async() => {
        const {data} = await Axios.get(`${getAllVehicles}?violationOfficerData.id=${Number(id)}`);
        return data
    }

    const violationsData = useQuery({queryKey: ["getViolations"], queryFn: getViolationsData});

    return <React.Fragment>

        <section className={`
            ${officerRes.isError || violationsData.isError ? 'h-full' : ''}
            w-full flex flex-col gap-5
        `}>

            <div className='w-full flex items-center gap-1'>
                <Link to={'/officers'} className='text-[var(--gray-color-2)] font-medium'>Officers</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>Officer Profile</p>
            </div>

            {(officerRes.isError || violationsData.isError) ? 
                (
                    <FullError />
                ):
                (
                    <React.Fragment>

                    {(!officerRes.isLoading || !violationsData.isLoading) && officerRes.data && violationsData.data &&
                        <React.Fragment>

                            <div className='
                                w-full p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                flex items-center gap-5 max-[770px]:flex-col max-[770px]:items-start
                            '>

                                <div className='w-52 h-52 overflow-hidden max-[430px]:w-28 max-[430px]:h-28 max-[430px]:m-auto'>
                                    <img className='w-full h-full rounded-full object-cover' src={officerImg} alt={officerRes?.data?.name} />
                                </div>

                                <div className='w_cont-200 flex flex-col gap-2.5'>

                                    <h3 className='text-2xl font-semibold text-[var(--black-color)]'>{officerRes?.data?.name}</h3>

                                    <p className='text-[var(--gray-color-2)]'>ID: {officerRes?.data?.officerId}</p>

                                    <div className='w-full grid grid-cols-2 gap-2.5 max-[550px]:grid-cols-1'>

                                        <RowDetails title={'Rank'} content={officerRes?.data?.rank} />
                                        <RowDetails title={'Badge Number'} content={officerRes?.data?.badgeNum} />
                                        <RowDetails title={'Username'} content={officerRes?.data?.username} />
                                        <RowDetails title={'Location'} content={officerRes?.data?.location} />

                                    </div>

                                </div>

                            </div>

                            <div className='w-full grid grid-cols-4 gap-5 max-[985px]:grid-cols-2 max-[520px]:grid-cols-1'>

                                <div className='
                                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                    flex flex-col gap-2.5
                                '>
                                    <h3 className='text-lg font-medium text-[var(--black-color)]'>Total Violations</h3>
                                    <p className='text-2xl font-medium text-[var(--gray-color-2)]'>{violationsData?.data?.length}</p>
                                </div>

                                <div className='
                                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                    flex flex-col gap-2.5
                                '>
                                    <h3 className='text-lg font-medium text-[var(--black-color)]'>Active Cases</h3>
                                    <p className='text-2xl font-medium text-[var(--gray-color-2)]'>
                                        {violationsData?.data?.filter(vio => vio.status === 'Wanted').length}
                                    </p>
                                </div>

                                <div className='
                                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                    flex flex-col gap-2.5
                                '>
                                    <h3 className='text-lg font-medium text-[var(--black-color)]'>Cases Solved</h3>
                                    <p className='text-2xl font-medium text-[var(--gray-color-2)]'>
                                        {violationsData?.data?.filter(vio => vio.status === 'Impounded').length}
                                    </p>
                                </div>

                                <div className='
                                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                    flex flex-col gap-2.5
                                '>
                                    <h3 className='text-lg font-medium text-[var(--black-color)]'>Pending Cases</h3>
                                    <p className='text-2xl font-medium text-[var(--gray-color-2)]'>
                                        {violationsData?.data?.filter(vio => vio.status === 'pending').length}
                                    </p>
                                </div>

                            </div>

                        </React.Fragment>
                    }

                    {(officerRes.isLoading || violationsData.isLoading) && <ProfileLoading />}

                    <div className='
                        w-full flex flex-col gap-5 rounded-md bg-[var(--white-color)] 
                        shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                    '>

                        <div className='w-full p-5 flex flex-wrap items-center justify-between gap-5'>

                            <h3 className='text-2xl font-semibold text-[black-color]'>Violations</h3>

                            <Link className='
                                px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                                text-base text-[var(--white-color)] font-medium cursor-pointer
                            '>
                                <IoIosAddCircleOutline className='text-xl' />
                                <p>{t('addViolationWord')}</p>
                            </Link>

                        </div>

                        <div className='w-full overflow-auto hidden_scroll'>

                            <table className='w-full border-collapse'>

                                <thead>

                                    <tr className="
                                        text-base text-[var(--black-color)] text-center
                                        border-t border-solid border-[var(--gray-color-1)]
                                    ">

                                        <th className="px-2.5 py-5 whitespace-nowrap">{t('plateNumWord')}</th>
                                        <th className={`
                                            ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                            border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                                        `}>{t('locationWord')}</th>
                                        <th className={`
                                            ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                            border-solid border-[var(--gray-color-1)] px-2.5 py-5 whitespace-nowrap
                                        `}>{t('violationWord')}</th>
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

                                <tbody>

                                    {(violationsData.isLoading || officerRes.isLoading)  && <TableLoading />}

                                    {(!violationsData.isLoading && !officerRes.isLoading) 
                                    && (!violationsData.isError && !officerRes.isError) 
                                    && (violationsData.data && officerRes.data) 
                                    && violationsData.data.length > 0 &&
                                        violationsData.data.map(officer => <tr key={officer.id} className='
                                            border-t border-solid border-[var(--gray-color-1)]
                                            text-base font-normal text-[var(--gray-color-2)] text-center
                                            duration-300 hover:bg-[var(--salt-color)] cursor-pointer
                                        '>

                                            <td className='p-2.5 whitespace-nowrap'>{officer.plateNum}</td>
                                            <td className={`
                                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                            `}>{officer.location}</td>
                                            <td className={`
                                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                            `}>{officer.violations}</td>
                                            <td className={`
                                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                            `}>
                                                {officer.status === 'Wanted' && 
                                                    <div className='w-full flex items-center justify-center'>
                                                        <p className='
                                                            w-fit px-2 rounded-4xl bg-[var(--red-opacity-color)]
                                                            font-medium text-[var(--red-color)]
                                                        '>{officer.status}</p>
                                                    </div>
                                                }
                                                {officer.status === 'Impounded' &&
                                                    <div className='w-full flex items-center justify-center'>
                                                        <p className='
                                                            w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                                            font-medium text-[var(--gray-color)]
                                                        '>{officer.status}</p>
                                                    </div>
                                                }
                                                {officer.status === 'pending' &&
                                                    <div className='w-full flex items-center justify-center'>
                                                        <p className='
                                                            w-fit px-2 rounded-4xl bg-[var(--yellow-opacity-color)]
                                                            font-medium text-[var(--yellow-color)]
                                                        '>{officer.status}</p>
                                                    </div>
                                                }
                                            </td>
                                            <td className={`
                                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                                            `}>
                                                <Link 
                                                    to={`vehicle/${officer.id}`}
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

                                                    <button className='
                                                        p-2.5 rounded-md bg-[var(--gray-color-3)]
                                                        text-[var(--red-color)] cursor-pointer duration-300
                                                        hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                                    '><IoBanSharp /></button>

                                                </div>
                                            </td>

                                        </tr>)
                                    }

                                    {!violationsData.isLoading && !violationsData.error && violationsData.data 
                                    && violationsData.data.length === 0 && officerRes.data &&
                                        <TableError isRed={false} icon={warningSVG} msg={'noViolationsYet'} />
                                    }

                                </tbody>

                            </table>

                        </div>

                    </div>

                    </React.Fragment>
                )
            }

        </section>

    </React.Fragment>

}
