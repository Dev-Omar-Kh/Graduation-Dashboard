import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import Input from '../../../Components/Inputs/Manual-Inputs/Input';
import ImgInput from '../../../Components/Inputs/Images-Input/ImgInput';
import ListInput from '../../../Components/Inputs/List-Input/ListInput';
import { FiEdit } from 'react-icons/fi';
import { useFormik } from 'formik';
import { Axios, getAllOfficers } from '../../../API/API';
import { useQuery } from '@tanstack/react-query';

export default function UpdateOfficer() {

    const {t} = useTranslation();
    const {id} = useParams();

    // ======= get-officer-data-by-id ======= //

    const getOfficerData = async() => {
        const {data} = await Axios.get(`${getAllOfficers}/${Number(id)}`);
        return data
    }

    const {data} = useQuery({queryKey: ["getDataOfficer", id], queryFn: getOfficerData});

    // ======= handle-form-values ======= //

    const values = {
        img_profile: data?.img_profile || '',
        name: data?.name || '',
        username: data?.username || '',
        badgeNumber: data?.badgeNum || '',
        phoneNumber: data?.phoneNumber || '',
        rank: data?.rank || '',
        location: data?.location || '',
        password: '',
        confirmPassword: ''
    }

    const handleSubmit = (values) => {
        console.log(values);
    }

    const formikObj = useFormik({

        initialValues: values,

        onSubmit: handleSubmit,

        enableReinitialize: true,

    });

    return <React.Fragment>

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/officers'} className='text-[var(--gray-color-2)] font-medium'>{t('officersTitle')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('updateOfficerDataWord')}</p>
            </div>

            <div className='w-full p-5 flex flex-col gap-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]'>

                <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                    <FiEdit className='text-3xl' />
                    <h3 className='text-2xl font-semibold'>{t('updateOfficerDataWord')}</h3>
                </div>

                <form onSubmit={formikObj.handleSubmit} className='w-full grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1'>

                    <div className='col-span-2 flex flex-col gap-2.5 max-[785px]:col-span-1'>
                        {formikObj.values.img_profile && <img 
                            className='w-16 h-16 rounded-md object-cover' 
                            src={formikObj.values.img_preview} alt="pfpImg" 
                        />}
                        <ImgInput 
                            label={'updateImageWord'} value={formikObj.values.img_profile} 
                            onChange={(event) => {
                                const file = event.target.files[0];
                                if (file) {
                                    const previewUrl = URL.createObjectURL(file);
                                    formikObj.setFieldValue('img_profile', file);
                                    formikObj.setFieldValue('img_preview', previewUrl);
                                }
                            }}
                            onBlur={formikObj.handleBlur}
                        />
                    </div>

                    <Input 
                        id={'name'} label={'officerNameWord'} type={'text'} password={false}
                        loading={true} placeHolder={'officerNamePlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.name}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'username'} label={'usernameWord'} type={'text'} password={false}
                        loading={true} placeHolder={'officerUsernamePlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.username}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'badgeNumber'} label={'badgeNumberWord'} type={'text'} password={false}
                        loading={true} placeHolder={'badgeNumberPlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.badgeNumber}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'phoneNumber'} label={'phoneNumberWord'} type={'text'} password={false}
                        loading={true} placeHolder={'phoneNumberPlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.phoneNumber}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'rank'} label={'chooseOfficerRankWord'}
                        placeHolder={'chooseOfficerRankPlaceholder'}
                        options={["Molemn", "Sergeant", "Lieutenant", "Captain", "Major", "Colonel", "General", "Brigadier"]}
                        onChange={formikObj.handleChange} value={formikObj.values.rank}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'location'} label={'serviceLocationWord'}
                        placeHolder={'serviceLocationPlaceholder'}
                        options={["Molemn", "Sergeant", "Lieutenant", "Captain", "Major", "Colonel", "General", "Brigadier"]}
                        onChange={formikObj.handleChange} value={formikObj.values.location}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'password'} label={'passwordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'passwordPlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.password}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'confirmPassword'} label={'confirmOfficerPasswordWord'} type={'password'} password={true}
                        loading={false} placeHolder={'confirmOfficerPasswordPlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.confirmPassword}
                        onBlur={formikObj.handleBlur}
                    />

                    <button 
                        type='submit' 
                        className='
                            w-full h-10 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--white-color)]
                            cursor-pointer duration-300 hover:bg-[var(--blue-opacity-color)]
                        '
                    >
                        {t('addWord')}
                    </button>

                    <button 
                        type='submit' 
                        className='
                            w-full h-10 rounded-md bg-[var(--gray-color)] 
                            text-base font-medium text-[var(--white-color)] cursor-pointer
                        '
                    >
                        {t('cancelWord')}
                    </button>

                </form>

            </div>

        </section>

    </React.Fragment>

}
