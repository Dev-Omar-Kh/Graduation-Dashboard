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

import warningSVG from '../../assets/JSON/warning.json';
import wrongSVG from '../../assets/JSON/wrong.json';

export default function VehicleM() {

    const {t, i18n} = useTranslation();

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

    return <React.Fragment>

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
                    <p>{t('addVehicleWord')}</p>
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
                w-full px-2.5 rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <table className='w-full border-collapse'>

                    <thead>

                        <tr className="text-base text-[var(--black-color)] text-center">

                            <th className="px-5 py-2.5">{t('plateNumWord')}</th>
                            <th className="px-5 py-2.5">{t('ownerNameWord')}</th>
                            <th className="px-5 py-2.5">{t('locationWord')}</th>
                            <th className="px-5 py-2.5">{t('violationWord')}</th>
                            <th className="px-5 py-2.5">{t('statusWord')}</th>
                            <th className="px-5 py-2.5">{t('actionsWord')}</th>

                        </tr>

                    </thead>

                    <tbody>

                        {isLoading && <TableLoading />}

                        {!isLoading && error && <TableError isRed={true} icon={wrongSVG} msg={'errorTableMsg'} />}

                        {!isLoading && !error && data && filteredArray && filteredArray.length > 0 &&
                            filteredArray.map(officer => <tr key={officer.id} className='
                                border-t border-solid border-[var(--gray-color-1)]
                                text-base font-normal text-[var(--gray-color-2)] text-center
                            '>

                                <td className='py-2.5'>{officer.plateNum}</td>
                                <td className='py-2.5'>{officer.owner}</td>
                                <td className='py-2.5'>{officer.location}</td>
                                <td className='py-2.5'>
                                    <Link className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'>
                                        <p>{officer.violations}</p>
                                        <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                    </Link>
                                </td>
                                <td className='py-2.5'>
                                    {officer.status === 'Wanted' && 
                                        <p className='font-medium text-[var(--red-color)]'>{officer.status}</p>
                                    }
                                    {officer.status === 'Impounded' &&
                                        <p className='font-medium opacity-55'>{officer.status}</p>
                                    }
                                </td>
                                <td className='py-2.5'>
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

                        {!isLoading && !error && data && filteredArray && filteredArray.length === 0 &&
                            <TableError isRed={false} icon={warningSVG} msg={'vehiclesMatchedError'} />
                        }

                    </tbody>

                </table>

            </div>

        </section>

    </React.Fragment>

}
