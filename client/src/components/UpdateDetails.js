import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updateProfileDetails, getProfileDetails } from '../actions/userActions';

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid!')
		.required('Email is required!')
});

const UpdateDetails = ({ details, closeModal }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			firstName: details.firstName,
			lastName: details.lastName,
			email: details.email
		},
		validationSchema: validationSchema,
		onSubmit: (values, props) => {
			props.setSubmitting(true);
			dispatch(updateProfileDetails(values));
			closeModal();
			dispatch(getProfileDetails());
		}
	});

	return (
		<form onSubmit={formik.handleSubmit} noValidate>
			<TextField
				fullWidth
				id='firstName'
				name='firstName'
				value={formik.values.firstName}
				onChange={formik.handleChange}
				label='First Name'
				variant='outlined'
				margin='dense'
			/>
			<TextField
				fullWidth
				id='lastName'
				name='lastName'
				value={formik.values.lastName}
				onChange={formik.handleChange}
				label='Last Name'
				variant='outlined'
				margin='dense'
			/>
			<TextField
				fullWidth
				id='email'
				name='email'
				type='email'
				value={formik.values.email}
				onChange={formik.handleChange}
				label='Email'
				variant='outlined'
				margin='dense'
				required
				error={formik.touched.email && Boolean(formik.errors.email)}
				helperText={formik.touched.email && formik.errors.email}
			/>
			<Button
				fullWidth
				type='submit'
				variant='contained'
				color='primary'
				style={{ margin: '8px 0 !important' }}
				disabled={formik.isSubmitting}>
				{formik.isSubmitting ? 'Please wait' : 'Submit'}
			</Button>
		</form>
	);
};

export default UpdateDetails;