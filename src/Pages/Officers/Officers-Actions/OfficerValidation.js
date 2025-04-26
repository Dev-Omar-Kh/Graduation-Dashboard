import * as Yup from 'yup';

export const OfficerValidationSchema = (t) => (
    Yup.object({
        img_profile: Yup.mixed().required(t('imageRequiredError')),
        name: Yup.string()
            .min(3, t('nameMinError'))
            .max(50, t('nameMaxError'))
            .required(t('nameRequiredError')),
        username: Yup.string()
            .min(3, t('usernameMinError'))
            .max(20, t('usernameMaxError'))
            .required(t('usernameRequiredError')),
        badgeNumber: Yup.string()
            .matches(/^\d+$/, t('badgeNumberInvalidError'))
            .required(t('badgeNumberRequiredError')),
        phoneNumber: Yup.string()
            .matches(/^\+?\d{10,15}$/, t('phoneNumberInvalidError'))
            .required(t('phoneNumberRequiredError')),
        rank: Yup.string().required(t('rankRequiredError')),
        location: Yup.string().required(t('locationRequiredError')),
        password: Yup.string()
            .min(8, t('passwordMinError'))
            .required(t('passwordRequiredError')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('passwordMatchError'))
            .required(t('confirmPasswordRequiredError'))
    })
);