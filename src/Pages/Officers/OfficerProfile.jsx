import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import RowDetails from '../../Components/Row-Details/RowDetails';
import { IoIosAddCircleOutline, IoIosArrowForward } from 'react-icons/io';
import { useTranslation } from 'react-i18next';
import { Axios, getAllOfficers, getAllVehicles } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import { IoBanSharp } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import ProfileLoading from './ProfileLoading';
import FullError from '../../Components/Error/FullError';
import WarnPopUp from '../../Components/Pop-Up/WarnPopUp';
import Table from '../../Components/Table/Table';

import officerImg from '../../assets/Images/officer_3.webp';
import warningSVG from '../../assets/JSON/warning.json';

export default function OfficerProfile() {

    const {id} = useParams();
    const {t, i18n} = useTranslation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState(null);

    // ====== get-officer-data ====== //

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

    // ====== officer-data ====== //

    const handleOfficerData = [

        {id: 1, title: 'rankWord', det: officerRes?.data?.rank},
        {id: 2, title: 'badgeNum', det: officerRes?.data?.badgeNum},
        {id: 3, title: 'usernameWord', det: officerRes?.data?.username},
        {id: 4, title: 'locationWord', det: officerRes?.data?.location},

    ];

    const handleOfficerNumbers = [

        {id: 1, title: 'totalViolationsWord', det: violationsData?.data?.length},
        {id: 2, title: 'activeCasesWord', det: violationsData?.data?.filter(vio => vio.status === 'Wanted').length},
        {id: 3, title: 'casesSolvedWord', det: violationsData?.data?.filter(vio => vio.status === 'Impounded').length},
        {id: 4, title: 'pendingCases', det: violationsData?.data?.filter(vio => vio.status === 'pending').length},

    ]

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

        <section className={`
            ${officerRes.isError || violationsData.isError ? 'h-full' : ''}
            w-full flex flex-col gap-5
        `}>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/officers'} className='text-[var(--gray-color-2)] font-medium'>{t('officersTitle')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('officerProfileWord')}</p>
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
                                    <img 
                                        className='w-full h-full rounded-full object-cover' 
                                        src={officerImg} alt={officerRes?.data?.name} 
                                    />
                                </div>

                                <div className='w_cont-200 flex flex-col gap-2.5'>

                                    <h3 className='text-2xl font-semibold text-[var(--black-color)]'>{officerRes?.data?.name}</h3>

                                    <p className='text-[var(--gray-color-2)]'>{t('idWord')}: {officerRes?.data?.officerId}</p>

                                    <div className='w-full grid grid-cols-2 gap-2.5 max-[550px]:grid-cols-1'>
                                        {handleOfficerData.map(data =>
                                            <RowDetails key={data.id} title={data.title} content={data.det} />
                                        )}
                                    </div>

                                </div>

                            </div>

                            <div className='w-full grid grid-cols-4 gap-5 max-[985px]:grid-cols-2 max-[520px]:grid-cols-1'>

                                {handleOfficerNumbers.map(data => <div key={data.id} className='
                                    p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                                    flex flex-col gap-2.5
                                '>
                                    <h3 className='text-lg font-medium text-[var(--black-color)]'>{t(data.title)}</h3>
                                    <p className='text-2xl font-medium text-[var(--gray-color-2)]'>{data.det}</p>
                                </div>)}

                            </div>

                        </React.Fragment>
                    }

                    {(officerRes.isLoading || violationsData.isLoading) && <ProfileLoading />}

                    <div className='
                        w-full flex flex-col gap-5 rounded-md bg-[var(--white-color)] 
                        shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                    '>

                        <div className='w-full p-5 pb-0 flex flex-wrap items-center justify-between gap-5'>

                            <h3 className='text-2xl font-semibold text-[black-color]'> {t('violationsWord')} </h3>

                            <Link className='
                                px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                                text-base text-[var(--white-color)] font-medium cursor-pointer
                            '>
                                <IoIosAddCircleOutline className='text-xl' />
                                <p>{t('addViolationWord')}</p>
                            </Link>

                        </div>

                        <Table
                            columns={['plateNumWord', 'locationWord', 'violationWord', 'statusWord', 'detailsWord']}
                            bTHeader={true}
                            data={violationsData.data}
                            isLoading={violationsData.isLoading || officerRes.isLoading}
                            isError={violationsData.isError || officerRes.isError}
                            emptyMessage="noViolationsYet"
                            emptyIcon={warningSVG}
                            actions={true}
                            renderRow={(officer) => (
                                <>
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
                                            to={`/V-Management/vehicle/${officer.id}`}
                                            className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'
                                        >
                                            <p>{t('expandWord')}</p>
                                            <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                        </Link>
                                    </td>
                                </>
                            )}
                            onActionClick={(officer) => (
                                <div className='flex items-center justify-center gap-2.5'>

                                    <button className='
                                        p-2.5 rounded-md bg-[var(--gray-color-3)]
                                        text-[var(--blue-color)] cursor-pointer duration-300
                                        hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                                    '><FiEdit /></button>

                                    <button 
                                        onClick={() => handleBanClick(officer)}
                                        className='
                                            p-2.5 rounded-md bg-[var(--gray-color-3)]
                                            text-[var(--red-color)] cursor-pointer duration-300
                                            hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                                    '><IoBanSharp /></button>

                                </div>
                            )}
                        />

                    </div>

                    </React.Fragment>
                )
            }

        </section>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('banVehicleTitle')}
            message={t('banVehicleMessage')}
        />

    </React.Fragment>

}
