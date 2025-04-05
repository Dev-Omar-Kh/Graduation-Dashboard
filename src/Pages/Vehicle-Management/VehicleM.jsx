import React, { useEffect, useState } from 'react'
import Filter from '../../Components/Filter-Button/Filter'
import { FiEdit } from 'react-icons/fi';
import { IoIosAddCircleOutline, IoIosArrowForward, IoIosInformationCircleOutline } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { IoBanSharp, IoLocationOutline } from 'react-icons/io5';
import { MdSecurity } from 'react-icons/md';
import { useTranslation } from 'react-i18next';
import { Axios, getAllVehicles } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import TableError from '../../Components/Tables-Status/TableError';
import TableLoading from '../../Components/Tables-Status/TableLoading';
import WarnPopUp from '../../Components/Pop-Up/WarnPopUp';

import warningSVG from '../../assets/JSON/warning.json';
import wrongSVG from '../../assets/JSON/wrong.json';

export default function VehicleM() {

    const {t, i18n} = useTranslation();

    // ====== modal-state ====== //
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    // ====== get-officers-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(getAllVehicles);
        return data
    }

    const { data, error, isLoading } = useQuery({queryKey: ["getAllVehicles"], queryFn: getApiData});

    // ====== filters-data ====== //

    const [filters, setFilters] = useState({
        location: 'allLocationsWord',
        violations: 'allViolationsWord',
        status: 'allStatusWord'
    });
    const [filteredArray, setFilteredArray] = useState(data);

    const statusFilter = ['allStatusWord', ...new Set(data?.map(item => item.status))];

    const locationFilter = ['allLocationsWord', ...new Set(data?.map(item => item.location))];

    const violationsFilter = ['allViolationsWord', ...new Set(data?.map(item => item.violations))];

    useEffect(() => {

        if (data) {

            const filteredData = data.filter(officer => {
                const locationMatch = filters.location === 'allLocationsWord' || officer.location === filters.location;
                const violationsMatch = filters.violations === 'allViolationsWord' || officer.violations === filters.violations;
                const statusMatch = filters.status === 'allStatusWord' || officer.status === filters.status;
                return locationMatch && violationsMatch && statusMatch;
            });

            setFilteredArray(filteredData);

        }

    }, [filters, data]);

    const handleBanClick = (vehicle) => {
        setSelectedVehicle(vehicle);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {
        if (selectedVehicle) {
            // Your existing ban logic here
            setIsModalOpen(false);
            setSelectedVehicle(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedVehicle(null);
    };

    return <React.Fragment>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('banVehicle')}
            message={t('banVehicleMessage')}
        />

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex items-center justify-between flex-wrap gap-5'>

                <div>
                    <h3 className='text-4xl font-medium text-[var(--black-color)]'>{t('vehicleManagementWord')}</h3>
                    <p className='pt-0.5 text-base text-[var(--gray-color-2)]'>{t('vmSlogan')}</p>
                </div>

                <Link className='
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                    text-base text-[var(--white-color)] font-medium cursor-pointer
                '>
                    <IoIosAddCircleOutline className='text-xl' />
                    <p>{t('addViolationWord')}</p>
                </Link>

            </div>

            <div className='
                w-full flex items-center justify-end gap-5 flex-wrap 
                max-[775px]:grid max-[775px]:grid-cols-1
            '>

                <Filter 
                    icon={<IoLocationOutline className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={locationFilter} filterKey="location"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

                <Filter 
                    icon={<IoIosInformationCircleOutline className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={violationsFilter} filterKey="violations"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

                <Filter 
                    icon={<MdSecurity className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={statusFilter} filterKey="status"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

            </div>

            <div className='
                w-full rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <table className='w-full border-collapse'>

                    <thead>

                        <tr className="text-base text-[var(--black-color)] text-center">

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

                        {isLoading && <TableLoading />}

                        {!isLoading && error && <TableError isRed={true} icon={wrongSVG} msg={'errorTableMsg'} />}

                        {!isLoading && !error && data && filteredArray && filteredArray.length > 0 &&
                            filteredArray.map(officer => <tr key={officer.id} className='
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

                                        <button 
                                            onClick={() => handleBanClick(officer)}
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
                            <TableError isRed={false} icon={warningSVG} msg={'vehiclesMatchedError'} />
                        }

                    </tbody>

                </table>

            </div>

        </section>

    </React.Fragment>

}
