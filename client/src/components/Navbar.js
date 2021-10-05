import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { makeStyles } from '@material-ui/core/styles';
import { logout } from '../actions/authActions';

const useStyles = makeStyles({
	root: {
		position: 'fixed',
		top: 0,
		left: 0,
		width: '100%',
		height: '56px',
		zIndex: 1
	},
	nav: {
		display: 'flex',
		alignItems: 'center',
		height: '100%',
		padding: '0 0.3rem'
	},
	link: {
		color: 'white',
		textDecoration: 'none',
		margin: '0 0.5rem'
	},
	list: {
		margin: '0 !important',
		padding: '0 !important',
		display: 'flex'
	},
	listItem: {
		padding: '0 0.5rem'
	}
});

const Navbar = () => {
	const classes = useStyles();

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();

	const handleLogout = () => {
		dispatch(logout());
	};

	const guestElements = (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Link to='/register' className={classes.link}>
					<Typography>Register </Typography>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<Link to='/login' className={classes.link}>
					<Typography>Log In</Typography>
				</Link>
			</ListItem>
		</List>
	);

	const userElements = (
		<List className={classes.list}>
			<ListItem className={classes.listItem}>
				<Link to='/profile' className={classes.link}>
					<Typography>Profile </Typography>
				</Link>
			</ListItem>
			<ListItem className={classes.listItem}>
				<IconButton color='inherit' onClick={handleLogout}>
					<FontAwesomeIcon icon={faSignOutAlt} />
				</IconButton>
			</ListItem>
		</List>
	);

	return (
		<AppBar className={classes.root}>
			<nav className={classes.nav}>
				<div>
					<Link to='/' className={classes.link}>
						<Typography variant='h5'>Ask Anything </Typography>
					</Link>
				</div>
				<div style={{ flex: 1 }}></div>
				<div>{currentUser ? userElements : guestElements}</div>
			</nav>
		</AppBar>
	);
};

export default Navbar;
