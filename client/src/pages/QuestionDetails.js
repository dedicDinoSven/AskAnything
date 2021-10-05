import React, { useState, useEffect, Fragment } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import QuestionContainer from '../components/QuestionContainer';
import AnswerForm from '../components/AnswerForm';
import AnswerContainer from '../components/AnswerContainer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { createAnswer } from '../actions/answerActions';

const useStyles = makeStyles({
	paper: {
		padding: '18px !important',
		border: '2px solid #3f51b5'
	}
});

const QuestionDetails = () => {
	const classes = useStyles();
	const [question, setQuestion] = useState({});
	let { id } = useParams();

	const { user: currentUser } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const getQuestion = async (questionId) => {
		try {
			const response = await axios.get(`/question/details/${questionId}`);
			setQuestion(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		getQuestion(id);
	}, [id, dispatch]);

	const submitAnswer = (values, props) => {
		props.setSubmitting(true);
		dispatch(createAnswer(values.text, id))
			.then(() => {
				props.setSubmitting(false);
				props.resetForm();
				getQuestion(id);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<Container>
			<Paper variant='outlined' className={classes.paper}>
				<QuestionContainer
					question={question}
					getQuestion={getQuestion}
					questionId={id}
				/>
				{currentUser && (
					<Fragment>
						<Divider />
						<AnswerForm onSubmit={submitAnswer} />
					</Fragment>
				)}
				<Typography variant='h5'>
					Number of answers: {question.answers && question.answers.length}
				</Typography>
				<Divider />
				{question.answers &&
					question.answers.map((answer, index) => (
						<Fragment key={index}>
							<AnswerContainer
								answer={answer}
								getQuestion={getQuestion}
							/>
							<Divider />
						</Fragment>
					))}
			</Paper>
		</Container>
	);
};

export default QuestionDetails;
