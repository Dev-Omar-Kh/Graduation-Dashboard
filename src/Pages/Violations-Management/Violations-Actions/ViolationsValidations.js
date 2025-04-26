import * as Yup from 'yup';

export const ViolationValidationSchema = (t) => (

    Yup.object({
        plateNumber: Yup.string()
            .matches(/^[A-Za-z0-9]+$/, t('plateNumberInvalidError'))
            .required(t('plateNumberRequiredError')),
        violationType: Yup.string()
            .required(t('violationTypeRequiredError')),
        violationDate: Yup.date()
            .required(t('violationDateRequiredError')),
        violationLocation: Yup.string()
            .required(t('violationLocationRequiredError')),
        violationOfficer: Yup.string()
            .required(t('violationOfficerRequiredError')),
        status: Yup.string()
            .oneOf(['Wanted', 'Impounded', 'pending'], t('statusInvalidError'))
            .required(t('statusRequiredError')),
        notes: Yup.string()
            .max(500, t('notesMaxError'))
    })

);