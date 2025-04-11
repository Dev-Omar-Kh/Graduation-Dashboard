import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoCarSportOutline } from 'react-icons/io5';
import { MdOutlineReport } from 'react-icons/md';
import { TbNotes } from "react-icons/tb";
import DetailsLoading from './DetailsLoading';
import { Axios, getAllVehicles } from '../../API/API';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import FullError from '../../Components/Error/FullError';
import RowDetails from '../../Components/Row-Details/RowDetails';

export default function VehicleDetails() {

    const {id} = useParams();
    const {t} = useTranslation();

    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllVehicles}/${Number(id)}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({queryKey: ["getSingleVehicle"], queryFn: getApiData});

    const vehicleData = [

        {
            icon: <IoCarSportOutline className='text-3xl' />,
            title: 'vehicleDataWord',
            data: [
                {title: "plateNumWord", det: data?.plateNum},
                {title: "brandWord", det: data?.brand},
                {
                    title: "ownerNameWord", 
                    det: data?.vehicleOwner.name, 
                    ownerId: `car-owner/${data?.vehicleOwner.id}`
                },
                {title: "locationWord", det: data?.licenseLocation}
            ]
        },

        {
            icon: <MdOutlineReport className='text-3xl' />,
            title: 'vehicleViolationWord',
            data: [
                {title: "idWord", det: data?.violationId},
                {title: "typeWord", det: data?.violationType},
                {title: "dateWord", det: data?.violationDate},
                {title: "locationWord", det: data?.violationLocation},
                {
                    title: "officerWord", 
                    det: data?.violationOfficerData.name, 
                    policeId: `/officers/profile/${data?.violationOfficerData.id}`
                },
                {title: "statusWord", det: data?.status}
            ]
        }

    ];

    return <React.Fragment>

        <section className={`w-full ${isError ? 'h-full' : ''} flex flex-col gap-5`}>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/V-Management'} className='text-[var(--gray-color-2)] font-medium'>{t('vehicleManagementWord')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('vehicleDetails')}</p>
            </div>

            {isLoading && <DetailsLoading />}

            {!isLoading && isError && <FullError />}

            {!isLoading && !isError && data && <React.Fragment>

                {vehicleData.map((box, idx) => <div key={idx} className='
                    p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                    shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                '>

                    <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                        {box.icon}
                        <h3 className='text-2xl font-semibold'>{t(box.title)}</h3>
                    </div>

                    <div className='w-full grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                        {box.data.map((card, idx) => (
                            <RowDetails 
                                key={idx} title={card.title} content={card.det} 
                                link={card.policeId || card.ownerId ? card.policeId || card.ownerId : null} 
                            />
                        ))}

                    </div>

                </div>)}

                <div className='
                    p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                    shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
                '>

                    <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                        <TbNotes className='text-3xl' />
                        <h3 className='text-2xl font-semibold'>{t('additionalNotesWord')}</h3>
                    </div>

                    <div className='w-full grid grid-cols-1 gap-2.5'>

                        <div className={`p-2.5 flex flex-col gap-2 rounded-md bg-[var(--salt-color)]`}>

                            {data?.notes.map((note, idx) => <p key={idx} className='text-base font-medium text-[var(--gray-color-2)]'>
                                {note}
                            </p>)}

                        </div>

                    </div>

                </div>

            </React.Fragment>}

        </section>

    </React.Fragment>

}
