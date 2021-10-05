import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useDispatch, useSelector } from 'react-redux';
import { getMostAnswersList } from '../actions/answerActions';

const MostActiveUsers = () => {
	const users = useSelector((state) => state.answer);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getMostAnswersList());
	}, [dispatch]);

	return (
		<TableContainer component={Paper}>
			<Table>
				<TableHead>
					<TableRow>
						<TableCell>#</TableCell>
						<TableCell align='right'>User</TableCell>
						<TableCell align='right'>Answers</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{users &&
						users.map((user, index) => (
							<TableRow
								key={index}
								style={
									index % 2
										? { background: '#ffffff' }
										: { background: '#dedede' }
								}>
								<TableCell>{index + 1}</TableCell>
								<TableCell align='right'>
									{user._id
										? user._id.firstName && user._id.lastName
											? user._id.firstName + ' ' + user._id.lastName
											: user._id.email
										: ''}
								</TableCell>
								<TableCell align='right'>{user.answersCount}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default MostActiveUsers;
