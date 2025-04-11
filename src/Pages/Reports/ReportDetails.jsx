import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useParams } from 'react-router-dom';
import RowDetails from '../../Components/Row-Details/RowDetails';
import { HiOutlineDocumentReport } from 'react-icons/hi';
import { LuClipboardList } from 'react-icons/lu';
import { Axios, getAllReports } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import DetailsLoading from '../Vehicle-Management/DetailsLoading';
import FullError from '../../Components/Error/FullError';

export default function ReportDetails() {

    const {id} = useParams();
    const {t} = useTranslation();

    // ====== get-report-data ====== //

    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllReports}/${Number(id)}`);
        return data
    }

    const {data, isLoading, isError} = useQuery({queryKey: ['getReportData'], queryFn: getApiData});

    const reportInfo = {
        icon: <LuClipboardList className='text-3xl' />,
        title: 'reportInfoWord',
        data: [
            {title: "officerInChargeWord", det: data?.officer.name, policeId: `/officers/profile/${data?.officer.id}`},
            {title: "priorityWord", det: data?.priority},
            {title: "statusWord", det: data?.isRead ? 'Reviewed' : 'Under Investigation'},
            {title: "dateWord", det: `
                ${data?.date.split('T')[0]} (${data?.date.split('T')[1].split('.')[0].split(':').slice(0, 2).join(':')})
            `}
        ]
    };

    return <React.Fragment>

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/V-Reports'} className='text-[var(--gray-color-2)] font-medium'>{t('reportsViewWord')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('reportDetailsWord')}</p>
            </div>

            {isLoading && <DetailsLoading />}

            {!isLoading && isError && <FullError />}

            {!isLoading && !isError && data && <React.Fragment>

                <div className='
                    p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                    shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                '>

                    <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                        <LuClipboardList className='text-3xl' />
                        <h3 className='text-2xl font-semibold'>{t('reportInfoWord')}</h3>
                    </div>

                    <div className='w-full grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                        {reportInfo.data.map((row, idx) => (
                            <RowDetails key={idx} title={row.title} content={row.det} link={row.policeId ? row.policeId : null} />
                        ) )}

                    </div>

                </div>

                <div className='
                    p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                    shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                '>

                    <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                        <HiOutlineDocumentReport className='text-3xl' />
                        <h3 className='text-2xl font-semibold'>{'Report'}</h3>
                    </div>

                    <div className='w-full'>

                        <RowDetails 
                            key={data?.id} title={data?.title} 
                            content={data?.message}
                        />

                    </div>

                </div>

            </React.Fragment>}

        </section>

    </React.Fragment>

}
