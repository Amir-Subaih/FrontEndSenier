import * as yup from 'yup';

export const loginSchema=yup.object({
    email:yup.string().required("Email is required"),
    password:yup.string().required("Password is required").min(5,"password must be at least 8 characters").max(13,"password must be max 13 characters"),
})

export const registerSchema=yup.object({
    name:yup.string().required("Name is required"),
    email:yup.string().required("Email is required"),
    phone:yup.string().required("Number is required"),
    password:yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[0-9])/, 'Password must contain a number')
    // .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character'),
    confirmPassword:yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters long')
    .matches(/(?=.*[0-9])/, 'Password must contain a number')
    // .matches(/(?=.*[a-z])/, 'Password must contain a lowercase letter')
    .matches(/(?=.*[A-Z])/, 'Password must contain an uppercase letter')
    .matches(/(?=.*[!@#$%^&*])/, 'Password must contain a special character').oneOf([yup.ref('password'), null], 'Passwords must match'),
});

export const UpdateInfoSchema=yup.object({
    name:yup.string(),
    email:yup.string(),
    phone:yup.string(),
});

export const ContactSchema=yup.object({
    name:yup.string().required("Name is required"),
    email:yup.string().required("Email is required"),
    message:yup.string().required("Message is required"),
});


