import React, { useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import 'moment/locale/en-gb';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getAllQuestions } from '../actions/questionActions';

const useStyles = makeStyles({
	root: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
	}
});

const RecentQuestions = () => {
	const classes = useStyles();
	const questions = useSelector((state) => state.question);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		dispatch(getAllQuestions());
	}, [dispatch]);

	return (
		<div className={classes.root}>
			<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Question</TableCell>
							<TableCell align='right'>Answers</TableCell>
							<TableCell align='right'>User</TableCell>
							<TableCell align='right'>Date</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{questions &&
							questions.map((question, index) => (
								<TableRow
									key={index}
									style={
										index % 2
											? { background: '#dedede' }
											: { background: '#ffffff' }
									}
									onClick={() => history.push(`question/${question._id}`)}>
									<TableCell>{question.title}</TableCell>
									<TableCell align='right'>
										{question.answers && question.answers.length}
									</TableCell>

									<TableCell align='right'>
										{question.author
											? question.author.firstName && question.author.lastName
												? question.author.firstName +
												  ' ' +
												  question.author.lastName
												: question.author.email
											: ''}
									</TableCell>
									<TableCell align='right'>
										{moment(question.date).locale('en-gb').format('LLL')}
									</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default RecentQuestions;
