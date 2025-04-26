import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoIosAddCircleOutline, IoIosArrowForward, IoMdWifi } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { Axios, getAllAdmins } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import Filter from './../../Components/Filter-Button/Filter';
import { GiRank3 } from 'react-icons/gi';
import Table from './../../Components/Table/Table';
import warningSVG from '../../assets/JSON/warning.json';
import { FiEdit } from 'react-icons/fi';
import { IoBanSharp } from 'react-icons/io5';
import WarnPopUp from '../../Components/Pop-Up/WarnPopUp';

export default function Admins() {

    const {t, i18n} = useTranslation();

    // ====== get-admins-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(getAllAdmins);
        return data
    }

    const { data, error, isLoading } = useQuery({queryKey: ["getAllAdmins"], queryFn: getApiData});

    // ====== filters-data ====== //

    const [filters, setFilters] = useState({
        role: 'allRolesWord',
        status: 'allStatusWord'
    });

    const [filteredArray, setFilteredArray] = useState(data);

    const statusFilter = ['allStatusWord', ...new Set(data?.map(item => item.status))];

    const roleFilter = ['allRolesWord', ...new Set(data?.map(item => item.role))];

    useEffect(() => {

        if (data) {

            const filteredData = data.filter(officer => {
                const roleMatch = filters.role === 'allRolesWord' || officer.role === filters.role;
                const statusMatch = filters.status === 'allStatusWord' || officer.status === filters.status;
                return roleMatch && statusMatch;
            });

            setFilteredArray(filteredData);

        }

    }, [filters, data]);

    // ====== handle-ban-click ====== //

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleBanClick = (admin) => {
        setSelectedAdmin(admin);
        setIsModalOpen(true);
    };

    const handleConfirmBan = () => {
        if (selectedAdmin) {
            // Your existing ban logic here
            setIsModalOpen(false);
            setSelectedAdmin(null);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAdmin(null);
    };

    return <React.Fragment>

        <WarnPopUp
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleConfirmBan}
            title={t('banAdminTitle')}
            message={t('banAdminMessage')}
        />

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex items-center justify-between flex-wrap gap-5'>

                <div>
                    <h3 className='text-4xl font-medium text-[var(--black-color)]'>{t('adminsTitle')}</h3>
                    <p className='pt-0.5 text-base text-[var(--gray-color-2)]'>{t('adminsSlogan')}</p>
                </div>

                <Link to={'add-admin'} className='
                    px-5 py-2.5 flex items-center gap-2.5 rounded-md bg-[var(--blue-color)]
                    text-base text-[var(--white-color)] font-medium cursor-pointer
                '>
                    <IoIosAddCircleOutline className='text-xl' />
                    <p>{t('addAdminWord')}</p>
                </Link>

            </div>

            <div className='
                w-full flex items-center justify-end gap-5 flex-wrap 
                max-[775px]:grid max-[775px]:grid-cols-1
            '>

                <Filter 
                    icon={<GiRank3 className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={roleFilter} filterKey="role"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

                <Filter 
                    icon={<IoMdWifi className='text-2xl text-[var(--gray-color-2)]' />} 
                    data={statusFilter} filterKey="status"
                    onFilterChange={(key, value) => setFilters(prev => ({...prev, [key]: value}))}
                />

            </div>

            <div className='
                w-full rounded-md bg-[var(--white-color)] 
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-x-auto hidden_scroll
            '>

                <Table 
                    columns={['adminWord', 'usernameWord', 'roleWord', 'statusWord', 'profileWord']}
                    data={filteredArray}
                    isLoading={isLoading}
                    isError={error}
                    emptyMessage="noAdminsYet"
                    emptyIcon={warningSVG}
                    actions={true}
                    renderRow={(admin) => (
                        <React.Fragment>

                            <td className='p-2.5 whitespace-nowrap'>{admin.name}</td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>{admin.username}</td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                {admin.role === 'Super Admin' && 
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--gray-color-3)]
                                            font-medium text-[var(--blue-color)]
                                        '>{admin.role}</p>
                                    </div>
                                }
                                {admin.role === 'Admin' &&
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                            font-medium text-[var(--gray-color)]
                                        '>{admin.role}</p>
                                    </div>
                                }
                            </td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                {admin.status === 'Online' && 
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--green-opacity-color)]
                                            font-medium text-[var(--green-color)]
                                        '>{admin.status}</p>
                                    </div>
                                }
                                {admin.status === 'Offline' &&
                                    <div className='w-full flex items-center justify-center'>
                                        <p className='
                                            w-fit px-2 rounded-4xl bg-[var(--gray-opacity-color-3)]
                                            font-medium text-[var(--gray-color)]
                                        '>{admin.status}</p>
                                    </div>
                                }
                            </td>
                            <td className={`
                                ${i18n.language === 'en' ? 'border-l' : 'border-r'} 
                                border-solid border-[var(--gray-color-1)] p-2.5 whitespace-nowrap
                            `}>
                                <Link 
                                    to={`profile/${admin.id}`}
                                    className='flex items-center justify-center gap-1 cursor-pointer text-[var(--blue-color)]'
                                >
                                    <p>{t('viewProfileWord')}</p>
                                    <IoIosArrowForward className={`${i18n.language === 'ar' ? 'rotate-y-180' : ''}`} />
                                </Link>
                            </td>

                        </React.Fragment>
                    )}
                    onActionClick={(admin) => (
                        <div className='flex items-center justify-center gap-2.5'>
                            <Link to={`update-admin-data/${admin.id}`} className='
                                p-2.5 rounded-md bg-[var(--gray-color-3)]
                                text-[var(--blue-color)] cursor-pointer duration-300
                                hover:bg-[var(--blue-color)] hover:text-[var(--white-color)]
                            '><FiEdit /></Link>

                            <button 
                                onClick={() => handleBanClick(admin)}
                                className='
                                    p-2.5 rounded-md bg-[var(--gray-color-3)]
                                    text-[var(--red-color)] cursor-pointer duration-300
                                    hover:bg-[var(--red-color)] hover:text-[var(--white-color)]
                            '><IoBanSharp /></button>
                        </div>
                    )}
                />

            </div>

        </section>

    </React.Fragment>

}
