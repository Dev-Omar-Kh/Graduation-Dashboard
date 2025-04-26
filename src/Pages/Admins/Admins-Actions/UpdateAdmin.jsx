import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link, useParams } from 'react-router-dom';
import { Axios, getAllAdmins } from '../../../API/API';
import { useQuery } from '@tanstack/react-query';
import { useFormik } from 'formik';
import { FiEdit } from 'react-icons/fi';
import ImgInput from '../../../Components/Inputs/Images-Input/ImgInput';
import Input from '../../../Components/Inputs/Manual-Inputs/Input';
import ListInput from '../../../Components/Inputs/List-Input/ListInput';
import FullError from '../../../Components/Error/FullError';
import { AdminValidationSchema } from './AdminValidation';

export default function UpdateAdmin() {

    const {t} = useTranslation();
    const {id} = useParams();

    // ====== get-admin-data ====== //

    const getAdminData = async() => {
        const {data} = await Axios.get(`${getAllAdmins}/${Number(id)}`);
        return data
    }

    const {data, isLoading, isError} = useQuery({queryKey: ["getAdminData", id], queryFn: getAdminData});

    // ======= handle-form-values ======= //

    const values = {
        img_profile: data?.img_profile || '',
        name: data?.name || '',
        username: data?.username || '',
        role: data?.role || '',
        password: '',
        confirmPassword: ''
    }

    const handleSubmit = (values) => {
        console.log(values);
    }

    // ======= handle-formik ======= //

    const formikObj = useFormik({
    
        initialValues: values,

        onSubmit: handleSubmit,

        validationSchema: AdminValidationSchema(t),

        enableReinitialize: true,

    });

    if(isError){return <FullError />}

    return <React.Fragment>

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/admins'} className='text-[var(--gray-color-2)] font-medium'>{t('adminsTitle')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('updateAdminDataWord')}</p>
            </div>

            <div className='w-full p-5 flex flex-col gap-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]'>

                <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                    <FiEdit className='text-3xl' />
                    <h3 className='text-2xl font-semibold'>{t('updateAdminDataWord')}</h3>
                </div>

                <form onSubmit={formikObj.handleSubmit} className='w-full grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1'>

                    <div className='col-span-2 flex flex-col gap-2.5 max-[785px]:col-span-1'>
                        {formikObj.values.img_profile && <img 
                            className='w-16 h-16 rounded-md object-cover' 
                            src={formikObj.values.img_preview} alt="pfpImg" 
                        />}
                        <ImgInput 
                            label={'uploadImageWord'} value={formikObj.values.img_profile} 
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
                        id={'name'} label={'adminNameWord'} type={'text'} password={false}
                        loading={true} placeHolder={isLoading ? 'loadingInputMsg' : 'adminNamePlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.name}
                        onBlur={formikObj.handleBlur}
                    />

                    <Input 
                        id={'username'} label={'usernameWord'} type={'text'} password={false}
                        loading={true} placeHolder={isLoading ? 'loadingInputMsg' : 'adminUsernamePlaceholder'}
                        onChange={formikObj.handleChange} value={formikObj.values.username}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'role'} label={'chooseAdminRoleWord'}
                        placeHolder={isLoading ? 'loadingInputMsg' : 'chooseAdminRolePlaceholder'}
                        options={["Super Admin", "Admin"]}
                        onChange={formikObj.handleChange} value={formikObj.values.role}
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

                    <div className='col-span-2 grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1 max-[785px]:col-span-1'>

                        <button 
                            type='submit' 
                            className='
                                w-full h-10 rounded-md bg-[var(--blue-color)] text-base font-medium text-[var(--white-color)]
                                cursor-pointer duration-300 hover:bg-[var(--blue-opacity-color)]
                            '
                        >
                            {t('updateWord')}
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

                    </div>

                </form>

            </div>

        </section>

    </React.Fragment>

}
