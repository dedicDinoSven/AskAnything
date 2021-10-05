import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/authActions';

const useStyles = makeStyles({
	paper: {
		padding: '20px',
		width: '280px',
		margin: '20px auto'
	},
	button: {
		margin: '8px 0 !important'
	}
});

const validationSchema = Yup.object().shape({
	email: Yup.string()
		.email('Email is not valid!')
		.required('Email is required!'),
	password: Yup.string()
		.min(5, 'Password must be at least 5 characters long!')
		.required('Password is required!'),
	password2: Yup.string()
		.oneOf([Yup.ref('password')], 'Passwords must match!')
		.required('Please confirm your password!')
});

const Register = () => {
	const classes = useStyles();

	const [successful, setSuccessful] = useState(false);

	const { message } = useSelector((state) => state.message);
	const dispatch = useDispatch();

	const formik = useFormik({
		initialValues: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
			password2: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values, props) => {
			const { firstName, lastName, email, password } = values;
			setSuccessful(false);
			try {
				props.setSubmitting(true);

				const response = await dispatch(
					register(firstName, lastName, email, password)
				);

				if (response.status === 400) {
					setSuccessful(false);
				} else {
					setSuccessful(true);
				}
			} catch (err) {
				console.log(err);
			}
		}
	});

	return (
		<Grid container>
			<Paper elevation={10} className={classes.paper}>
				<Grid align='center'>
					<Avatar>
						<FontAwesomeIcon icon={faLock} />
					</Avatar>
					<Typography variant='h5'>Register</Typography>
				</Grid>
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
					<TextField
						fullWidth
						id='password'
						name='password'
						type='password'
						value={formik.values.password}
						onChange={formik.handleChange}
						label='Password'
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
						label='Confirm Password'
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
						className={classes.button}
						disabled={formik.isSubmitting}>
						{formik.isSubmitting ? 'Please wait' : 'Submit'}{' '}
					</Button>
				</form>
				<Typography>
					Already registered?{' '}
					<Link to='/login' style={{ textDecoration: 'none' }}>
						Log In
					</Link>
				</Typography>
				{message && (
					<Alert severity={successful ? 'success' : 'error'}>{message}</Alert>
				)}
			</Paper>
		</Grid>
	);
};

export default Register;
