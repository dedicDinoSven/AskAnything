import React, { useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUnlock } from '@fortawesome/free-solid-svg-icons';
import { Link, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../actions/authActions';
import '../index.css';

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
		.required('Password is required!')
});

const Login = () => {
	const classes = useStyles();

	const { isLoggedIn } = useSelector((state) => state.auth);
	const { message } = useSelector((state) => state.message);

	const dispatch = useDispatch();

	let history = useHistory();

	const formik = useFormik({
		initialValues: {
			email: '',
			password: ''
		},
		validationSchema: validationSchema,
		onSubmit: async (values, props) => {
			try {
				const { email, password } = values;
				props.setSubmitting(true);
				dispatch(login(email, password));
			} catch (err) {
				console.log(err);
			}
		}
	});

	useEffect(() => {
		if (isLoggedIn) {
			history.push('/');
		}
	}, [isLoggedIn, history]);

	return (
		<Grid container className='container'>
			<Paper elevation={10} className={classes.paper}>
				<Grid align='center'>
					<Avatar>
						<FontAwesomeIcon icon={faUnlock} />
					</Avatar>
					<Typography variant='h5'>Log In</Typography>
				</Grid>
				<form onSubmit={formik.handleSubmit} noValidate>
					<TextField
						fullWidth
						id='email'
						name='email'
						label='Email'
						value={formik.values.email}
						onChange={formik.handleChange}
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
						label='Password'
						value={formik.values.password}
						onChange={formik.handleChange}
						variant='outlined'
						margin='dense'
						required
						error={formik.touched.password && Boolean(formik.errors.password)}
						helperText={formik.touched.password && formik.errors.password}
					/>
					<Button
						type='submit'
						color='primary'
						variant='contained'
						className={classes.button}
						fullWidth
						disabled={formik.isSubmitting}>
						{formik.isSubmitting ? 'Please wait' : 'Submit'}
					</Button>
				</form>
				<Typography>
					Don't have an account?{' '}
					<Link to='/register' style={{ textDecoration: 'none' }}>
						Register
					</Link>
				</Typography>
				{message && <Alert severity='error'>{message}</Alert>}
			</Paper>
		</Grid>
	);
};

export default Login;
