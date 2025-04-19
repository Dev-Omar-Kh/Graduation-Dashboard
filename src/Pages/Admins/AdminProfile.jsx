import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Axios, getAllAdmins } from '../../API/API';
import { useQuery } from '@tanstack/react-query';

import officerImg from '../../assets/Images/officer.jpg';
import RowDetails from '../../Components/Row-Details/RowDetails';
import FullError from '../../Components/Error/FullError';
import AdminProfileLoading from './AdminProfileLoading';

export default function AdminProfile() {

    const {id} = useParams();
    const {t} = useTranslation();

    // ====== get-admin-data ====== //

    const getAdminData = async() => {
        const {data} = await Axios.get(`${getAllAdmins}/${Number(id)}`);
        return data
    }

    const {data, isLoading, isError} = useQuery({queryKey: ["getAdmin", id], queryFn: getAdminData});

    // ====== handle-admin-data ====== //

    const handleAdminData = [

        {id: 1, title: 'adminWord', det: data?.name},
        {id: 2, title: 'usernameWord', det: data?.username},
        {id: 3, title: 'roleWord', det: data?.role},
        {id: 4, title: 'statusWord', det: data?.status},

    ];

    return <React.Fragment>

        <section className={`
            w-full flex flex-col gap-5
        `}>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/admins'} className='text-[var(--gray-color-2)] font-medium'>{t('adminsTitle')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('adminProfileWord')}</p>
            </div>

            {isLoading && !isError && <AdminProfileLoading />}
            {!isLoading && isError && <FullError />}

            {!isError && !isLoading && <div className='
                w-full p-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]
                flex items-center gap-5 max-[770px]:flex-col max-[770px]:items-start
            '>

                <div className='w-52 h-52 overflow-hidden max-[430px]:w-28 max-[430px]:h-28 max-[430px]:m-auto'>
                    <img className='w-full h-full rounded-full object-cover' src={officerImg} alt={data?.name} />
                </div>

                <div className='w_cont-200 flex flex-col gap-2.5'>

                    <h3 className='text-2xl font-semibold text-[var(--black-color)]'>{data?.name}</h3>

                    <p className='text-[var(--gray-color-2)]'>{t('idWord')}: {data?.id}</p>

                    <div className='w-full grid grid-cols-2 gap-2.5 max-[550px]:grid-cols-1'>
                        {handleAdminData.map(data =>
                            <RowDetails key={data.id} title={data.title} content={data.det} />
                        )}
                    </div>

                </div>

            </div>}

        </section>

    </React.Fragment>

}
