import React, { useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import QuestionForm from '../components/QuestionForm';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createQuestion } from '../actions/questionActions';

const useStyles = makeStyles({
	paper: {
		padding: '18px !important',
		border: '2px solid #3f51b5'
	}
});

const NewQuestion = () => {
	const classes = useStyles();
	const [successful, setSuccessful] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const history = useHistory();

	if (!currentUser) {
		history.push('/login');
	}

	const submitForm = (values, props) => {
		const { title, text } = values;
		try {
			props.setSubmitting(true);
			dispatch(createQuestion(title, text)).then(() => {
				setSuccessful(true);
			});
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		if (successful) {
			history.push('/');
		}
	}, [successful, history]);

	return (
		<Container maxWidth='sm'>
			<Paper variant='outlined' className={classes.paper}>
				<Typography variant='h5'>You can ask whatever you want</Typography>
				<QuestionForm onSubmit={submitForm} />
			</Paper>
		</Container>
	);
};

export default NewQuestion;
