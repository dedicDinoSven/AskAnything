import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { updatePassword } from '../actions/userActions';

const validationSchema = Yup.object().shape({
	password: Yup.string()
		.min(5, 'New password must be at least 5 characters long!')
		.required('New password is required!'),
	password2: Yup.string()
		.oneOf([Yup.ref('password')], 'New passwords do not match!')
		.required('Please confirm your new password!')
});

const UpdatePassword = ({ closeModal }) => {
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			password: '',
			password2: ''
		},
		validationSchema: validationSchema,
		onSubmit: (values, props) => {
			props.setSubmitting(true);
			dispatch(updatePassword(values.password));
			closeModal();
		}
	});

	return (
		<form onSubmit={formik.handleSubmit} noValidate>
			<TextField
				fullWidth
				id='password'
				name='password'
				type='password'
				value={formik.values.password}
				onChange={formik.handleChange}
				label='New Password'
				variant='outlined'
				margin='dense'
				required
				error={formik.touched.password && Boolean(formik.errors.password)}
				helperText={formik.touched.password && formik.errors.password}
			/>
			<TextField
				fullWidth
				id='password2'
				name='password2'
				type='password'
				value={formik.values.password2}
				onChange={formik.handleChange}
				label='Confirm New Password'
				variant='outlined'
				margin='dense'
				required
				error={formik.touched.password2 && Boolean(formik.errors.password2)}
				helperText={formik.touched.password2 && formik.errors.password2}
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

export default UpdatePassword;
