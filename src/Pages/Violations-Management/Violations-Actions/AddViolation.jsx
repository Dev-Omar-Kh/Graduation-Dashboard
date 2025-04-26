import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RiAlarmWarningLine } from 'react-icons/ri';
import { useFormik } from 'formik';
import Input from '../../../Components/Inputs/Manual-Inputs/Input';
import Textarea from '../../../Components/Inputs/Textarea/Textarea';
import ListInput from '../../../Components/Inputs/List-Input/ListInput';
import { ViolationValidationSchema } from './ViolationsValidations';

export default function AddViolation() {

    const {t} = useTranslation();

    // ======= handle-form-values ======= //

    const values = {
        plateNumber: '',
        violationType: '',
        violationDate: '',
        violationLocation: '',
        violationOfficer: '',
        status: '',
        notes: ''
    }

    // ======= handle-form-submit ======= //

    const handleSubmit = (values) => {
        console.log(values);
    }

    // ======= handle-formik ======= //

    const formikObj = useFormik({
    
        initialValues: values,

        onSubmit: handleSubmit,

            validationSchema: ViolationValidationSchema(t),

        enableReinitialize: true,

    });

    return <React.Fragment>

        <section className='w-full flex flex-col gap-5'>

            <div className='w-full flex flex-wrap items-center gap-1'>
                <Link to={'/V-Management'} className='text-[var(--gray-color-2)] font-medium'>{t('vehicleManagementWord')}</Link>
                <span className='text-2xl text-[var(--gray-color-2)] font-medium'>/</span>
                <p className='text-[var(--black-color)] font-medium'>{t('addViolationWord')}</p>
            </div>

            <div className='w-full p-5 flex flex-col gap-5 rounded-md bg-[var(--white-color)] shadow-[0_0px_10px_var(--gray-color-3)]'>

                <div className="w-full flex items-center gap-2.5 text-[var(--blue-color)]">
                    <RiAlarmWarningLine className='text-3xl' />
                    <h3 className='text-2xl font-semibold'>{t('addViolationWord')}</h3>
                </div>

                <form onSubmit={formikObj.handleSubmit} className='w-full grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1'>

                    <Input 
                        id={'plateNumber'} label={'plateNumber'} type={'text'} password={false}
                        loading={true} placeHolder={'plateNumberPlaceholder'}
                        error={formikObj.touched.plateNumber && formikObj.errors.plateNumber ? formikObj.errors.plateNumber : null}
                        onChange={formikObj.handleChange} value={formikObj.values.plateNumber}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'violationType'} label={'typeWord'} 
                        type={'text'} password={false} placeHolder={'violationTypePlaceholder'}
                        options={["Molemn", "Sergeant", "Lieutenant", "Captain", "Major", "Colonel", "General", "Brigadier"]}
                        onChange={formikObj.handleChange} value={formikObj.values.violationType}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'violationLocation'} label={'locationWord'} 
                        type={'text'} password={false} placeHolder={'violationLocationPlaceholder'}
                        options={["Molemn", "Sergeant", "Lieutenant", "Captain", "Major", "Colonel", "General", "Brigadier"]}
                        onChange={formikObj.handleChange} value={formikObj.values.violationLocation}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'violationOfficer'} label={'officerWord'} 
                        type={'text'} password={false} placeHolder={'violationOfficerPlaceholder'}
                        options={["Molemn", "Sergeant", "Lieutenant", "Captain", "Major", "Colonel", "General", "Brigadier"]}
                        onChange={formikObj.handleChange} value={formikObj.values.violationOfficer}
                        onBlur={formikObj.handleBlur}
                    />

                    <ListInput 
                        id={'status'} label={'statusWord'} 
                        type={'text'} password={false} placeHolder={'statusPlaceholder'}
                        options={["Wanted", "Impounded", "pending"]}
                        onChange={formikObj.handleChange} value={formikObj.values.status}
                        onBlur={formikObj.handleBlur}
                    />

                    <div className='col-span-2 max-[785px]:col-span-1'>
                        <Textarea 
                            id={'notes'} label={'addNotesWord'} 
                            placeHolder={'addNotesPlaceholder'} value={formikObj.values.notes}
                            onChange={formikObj.handleChange} onBlur={formikObj.handleBlur}
                            error={formikObj.touched.notes && formikObj.errors.notes ? formikObj.errors.notes : null}
                        />
                    </div>

                    <div className='col-span-2 grid grid-cols-2 gap-2.5 max-[785px]:grid-cols-1 max-[785px]:col-span-1'>

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

                    </div>

                </form>

            </div>

        </section>

    </React.Fragment>

}
