import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { FaRegAddressCard } from "react-icons/fa6";
import RowDetails from '../../Components/Row-Details/RowDetails';
import { IoCarSportOutline } from 'react-icons/io5';
import { Axios, getAllOwners } from '../../API/API';
import { useQuery } from '@tanstack/react-query';
import DetailsLoading from './DetailsLoading';
import FullError from '../../Components/Error/FullError';

export default function OwnerDetails() {

    const {id, ownerId} = useParams();
    const {t} = useTranslation();

    const getApiData = async() => {
        const {data} = await Axios.get(`${getAllOwners}/${Number(ownerId)}`);
        return data
    }

    const { data, isError, isLoading } = useQuery({queryKey: ["getOwnerDetails"], queryFn: getApiData});

    // ====== driving-license-data ====== //

    const drivingLicenseData = [
        {title: "ownerNameAr", content: data?.drivingLicenseData.ownerName},
        {title: "nationalId", content: data?.drivingLicenseData.nationalId},
        {title: "nationality", content: data?.drivingLicenseData.nationality},
        {title: "educationalQualification", content: data?.drivingLicenseData.educationalQualification},
        {title: "issueDate", content: data?.drivingLicenseData.issueDate},
        {title: "expiryDate", content: data?.drivingLicenseData.expiryDate},
        {title: "licenseNumber", content: data?.drivingLicenseData.licenseNumber},
        {title: "trafficUnit", content: data?.drivingLicenseData.trafficUnit}, 
        {title: "trafficDepartment", content: data?.drivingLicenseData.trafficDepartment}, 
        {title: "addressWord", content: data?.drivingLicenseData.address}
    ];

    // ====== vehicle-license-data ====== //

    const vehicleLicenseData = [
        {title: "trafficUnit", content: data?.vehicleLicenseData.trafficUnit}, 
        {title: "trafficDepartment", content: data?.vehicleLicenseData.trafficDepartment}, 
        {title: "ownerNameAr", content: data?.vehicleLicenseData.ownerName},
        {title: "addressWord", content: data?.vehicleLicenseData.address},
        {title: "brandWord", content: data?.vehicleLicenseData.brand},
        {title: "vehicleType", content: data?.vehicleLicenseData.vehicleType},
        {title: "chassisNumber", content: data?.vehicleLicenseData.chassisNumber},
        {title: "engineNumber", content: data?.vehicleLicenseData.engineNumber},
        {title: "plateNumber", content: data?.vehicleLicenseData.plateNumber},
        {title: "carColor", content: data?.vehicleLicenseData.carColor},
        {title: "issueDate", content: data?.vehicleLicenseData.issueDate},
        {title: "expiryDate", content: data?.vehicleLicenseData.expiryDate},
        {title: "inspectionDate", content: data?.vehicleLicenseData.inspectionDate},
        {title: "glassType", content: data?.vehicleLicenseData.glassType},
    ];

    if(isLoading) return <DetailsLoading />
    if(isError) return <FullError />

    return <React.Fragment>

        <section className={`w-full flex flex-col gap-5`}>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/V-Management'} className='text-[var(--gray-color-2)] font-medium'>{t('vehicleManagementWord')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <Link to={`/V-Management/vehicle/${id}`} className='text-[var(--gray-color-2)] font-medium'>{t('vehicleDetails')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('ownerDetails')}</p>
            </div>

            <div className='
                p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
            '>

                <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                    <FaRegAddressCard className='text-3xl'/>
                    <h3 className='text-2xl font-semibold'>{t('drivingLicense')}</h3>
                </div>

                <div className='w-full grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                    {drivingLicenseData.map((item, index) => (
                        <RowDetails key={index} title={t(item.title)} content={item.content} />
                    ))}

                </div>

            </div>

            <div className='
                p-5 w-full rounded-md bg-[var(--white-color)] flex flex-col gap-5
                shadow-[0_0px_10px_var(--gray-color-3)] overflow-hidden
            '>

                <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                    <IoCarSportOutline className='text-3xl'/>
                    <h3 className='text-2xl font-semibold'>{t('vehicleLicense')}</h3>
                </div>

                <div className='w-full grid grid-cols-2 gap-2.5 max-[800px]:grid-cols-1'>

                    {vehicleLicenseData.map((item, index) => (
                        <RowDetails key={index} title={t(item.title)} content={item.content} />
                    ))}

                </div>

            </div>

        </section>

    </React.Fragment>

}
