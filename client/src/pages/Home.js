import React from 'react';
import RecentQuestions from '../components/RecentQuestions';
import MostActiveUsers from '../components/MostActiveUsers';
import { Button, Grid, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Home = () => {
	const { user: currentUser } = useSelector((state) => state.auth);

	return (
		<Grid container spacing={2} style={{ padding: '15px' }}>
			<Grid item xs={12} md={8}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Typography component='h2' variant='h6' color='primary' gutterBottom>
						Recent Questions
					</Typography>
					<div style={{ flex: 1 }}></div>
					{currentUser && (
						<Link
							to='/new-question'
							style={{ color: 'white', textDecoration: 'none' }}>
							<Button color='primary' variant='contained' size='small'>
								New Question
							</Button>
						</Link>
					)}
				</div>
				<RecentQuestions />
			</Grid>
			<Grid item xs={12} md={4}>
				<Typography component='h2' variant='h6' color='primary' gutterBottom>
					Most Answers
				</Typography>
				<MostActiveUsers />
			</Grid>
		</Grid>
	);
};

export default Home;
