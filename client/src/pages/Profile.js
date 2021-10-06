import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faAt,
	faCamera,
	faPen,
	faQuestion,
	faUser
} from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Modal from '../components/Modal';
import UpdateDetails from '../components/UpdateDetails';
import UpdatePassword from '../components/UpdatePassword';
import {
	getProfileDetails,
	updateProfileDetails
} from '../actions/userActions';
import axios from 'axios';
import '../index.css';

const useStyles = makeStyles({
	paper: {
		width: '390px',
		height: '310px',
		padding: '2rem',
		border: '2px solid #3f51b5'
	},
	listItem: {
		paddingLeft: '0px'
	},
	avatar: {
		height: '130px !important',
		width: '130px !important',
		border: '4px solid #fff',
		boxShadow: '0 2px 5px rgba(0, 0, 0, 0.5)',
		marginTop: '30px'
	}
});

const Profile = () => {
	const classes = useStyles();

	const [openUpdateDetails, setOpenUpdateDetails] = useState(false);
	const [openUpdatePassword, setOpenUpdatePassword] = useState(false);
	const [image, setImage] = useState('');

	const { user: currentUser } = useSelector((state) => state.auth);
	const details = useSelector((state) => state.user);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getProfileDetails());
	}, [dispatch]);

	if (!currentUser) {
		history.push('/login');
	}

	const uploadImage = async () => {
		try {
			const formData = new FormData();
			formData.append('file', image);
			formData.append('upload_preset', 'askAnything');
			formData.append('cloud_name', 'dctpgmg8g');

			const apiUrl = 'https://api.cloudinary.com/v1_1/dctpgmg8g/image/upload';
			const res = await axios.post(apiUrl, formData);

			dispatch(updateProfileDetails({ avatarUrl: res.data.url })).then(() => {
				dispatch(getProfileDetails());
				setImage('');
			});
		} catch (err) {
			console.log(err.response);
		}
	};

	return (
		<div className='container'>
			<Paper variant='outlined' className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item xs={7}>
						<Typography variant='h4'>User Details</Typography>
						<List dense={true}>
							<ListItem alignItems='flex-start' className={classes.listItem}>
								<ListItemIcon>
									<FontAwesomeIcon icon={faUser} />
								</ListItemIcon>
								<ListItemText
									primary={
										details.user
											? details.user.firstName && details.user.lastName
												? details.user.firstName + ' ' + details.user.lastName
												: ''
											: ''
									}
									secondary='Full Name'
								/>
							</ListItem>
							<ListItem alignItems='flex-start' className={classes.listItem}>
								<ListItemIcon>
									<FontAwesomeIcon icon={faAt} />
								</ListItemIcon>
								<ListItemText
									primary={details.user ? details.user.email : ''}
									secondary='Email'
								/>
							</ListItem>
							<ListItem alignItems='flex-start' className={classes.listItem}>
								<ListItemIcon>
									<FontAwesomeIcon icon={faQuestion} />
								</ListItemIcon>
								<ListItemText
									primary={details ? details.numberOfQuestions : '0'}
									secondary='Questions'
								/>
							</ListItem>
							<ListItem alignItems='flex-start' className={classes.listItem}>
								<ListItemIcon>
									<FontAwesomeIcon icon={faPen} />
								</ListItemIcon>
								<ListItemText
									primary={details ? details.numberOfAnswers : '0'}
									secondary='Answers'
								/>
							</ListItem>
						</List>
					</Grid>
					<Grid item container direction='column' alignItems='center' xs={5}>
						<Avatar
							className={classes.avatar}
							src={details.user ? details.user.avatarUrl : ''}
						/>
						<div style={{ margin: '6px 0px' }}>
							<input
								type='file'
								accept='image/*'
								onChange={(e) => setImage(e.target.files[0])}
								id='imageInput'
								style={{ display: 'none' }}
							/>
							{!image ? (
								<label htmlFor='imageInput'>
									<Button
										color='primary'
										variant='contained'
										size='small'
										component='span'
										endIcon={<FontAwesomeIcon icon={faCamera} />}>
										Choose photo
									</Button>
								</label>
							) : (
								<Button
									color='primary'
									variant='contained'
									size='small'
									onClick={uploadImage}>
									Upload photo
								</Button>
							)}
						</div>
						<Link
							component='button'
							onClick={() => setOpenUpdateDetails(true)}
							variant='body2'
							underline='hover'>
							Edit your details
						</Link>
						<Link
							component='button'
							onClick={() => setOpenUpdatePassword(true)}
							variant='body2'
							underline='hover'>
							Change Password
						</Link>
					</Grid>
				</Grid>
			</Paper>
			<Modal
				title='Edit User Details'
				open={openUpdateDetails}
				onClose={() => setOpenUpdateDetails(false)}>
				<UpdateDetails closeModal={() => setOpenUpdateDetails(false)} />
			</Modal>
			<Modal
				title='Change Password'
				open={openUpdatePassword}
				onClose={() => setOpenUpdatePassword(false)}>
				<UpdatePassword closeModal={() => setOpenUpdatePassword(false)} />
			</Modal>
		</div>
	);
};

export default Profile;
