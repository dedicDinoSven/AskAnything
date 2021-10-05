import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const useStyles = makeStyles({
	button: { margin: '8px 0 !important' }
});

const validationSchema = Yup.object().shape({
	text: Yup.string().required('Details are required!')
});

const AnswerForm = ({ onSubmit, text }) => {
	const classes = useStyles();

	const formik = useFormik({
		initialValues: { 
			text: text ? text : ''
		},
		validationSchema: validationSchema,
		onSubmit: onSubmit
	});

	return (
		<form onSubmit={formik.handleSubmit} noValidate>
			<TextField
				fullWidth
				multiline
				rows={3}
				id='text'
				name='text'
				type='text'
				value={formik.values.text}
				onChange={formik.handleChange}
				label='Answer'
				variant='outlined'
				margin='dense'
				required
				error={formik.touched.text && Boolean(formik.errors.text)}
				helperText={formik.touched.text && formik.errors.text}
			/>
			<Button
				fullWidth
				type='submit'
				variant='contained'
				color='primary'
				className={classes.button}
				disabled={formik.isSubmitting}>
				{formik.isSubmitting ? 'Please wait' : 'Submit'}
			</Button>
		</form>
	);
};

export default AnswerForm;
