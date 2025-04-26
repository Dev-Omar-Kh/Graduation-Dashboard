import * as Yup from 'yup';

export const AdminValidationSchema = (t) => (
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
        role: Yup.string()
            .oneOf(['Super Admin', 'Admin'], t('roleInvalidError'))
            .required(t('roleRequiredError')),
        password: Yup.string()
            .min(8, t('passwordMinError'))
            .required(t('passwordRequiredError')),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], t('passwordMatchError'))
            .required(t('confirmPasswordRequiredError'))
    })
);