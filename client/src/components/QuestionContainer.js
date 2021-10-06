import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';
import moment from 'moment';
import 'moment/locale/en-gb';
import { useDispatch, useSelector } from 'react-redux';
import {
	createRating,
	deleteQuestionRating,
	getQuestionRatings
} from '../actions/ratingActions';

const QuestionContainer = ({ question }) => {
	const dispatch = useDispatch();
	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	const { user: currentUser } = useSelector((state) => state.auth);
	const { likes, dislikes } = useSelector((state) => state.rating);

	useEffect(() => {
		question._id &&
			dispatch(getQuestionRatings(question._id)).then(() => {
					setIsLiked(false);
					setIsDisliked(false)
					 for (let like of likes) {
						if (currentUser && like.author === currentUser.id) {
							setIsLiked(true);
							break;
						}
					 }
					 for (let dislike of dislikes) {
						if (currentUser && dislike.author === currentUser.id) {
							setIsDisliked(true);
							break;
						}
					 }
			});
	}, [dispatch, question._id, likes.length, dislikes.length, currentUser]);

	const likeQuestion = () => {
		if (!isLiked) {
			if (isDisliked) {
				dispatch(deleteQuestionRating({ questionId: question._id, value: 0 }));
				setIsDisliked(false);
			}

			dispatch(
				createRating({
					author: currentUser.id,
					value: 1,
					question: question._id
				})
			);
			setIsLiked(true);
		} else {
			dispatch(deleteQuestionRating({ questionId: question._id, value: 1 }));
			setIsLiked(false);
		}

		question._id && dispatch(getQuestionRatings(question._id));
	};

	const dislikeQuestion = () => {
		if (!isDisliked) {
			if (isLiked) {
				dispatch(deleteQuestionRating({ questionId: question._id, value: 1 }));
				setIsLiked(false);
			}
			dispatch(
				createRating({
					author: currentUser.id,
					value: 0,
					question: question._id
				})
			);
			setIsDisliked(true);
		} else {
			dispatch(deleteQuestionRating({ questionId: question._id, value: 0 }));
			setIsDisliked(false);
		}

		question._id && dispatch(getQuestionRatings(question._id));
	};

	return (
		<Grid container spacing={0} style={{ paddingBottom: '15px' }}>
			<Grid
				item
				container
				direction='column'
				alignItems='center'
				xs={2}
				md={1}
				lg={1}>
				<Typography variant='caption'>
					Likes: {likes ? likes.length : '0'}
				</Typography>
				<IconButton
					size='small'
					style={isLiked ? { color: 'green' } : { color: 'black' }}
					onClick={() => {
						currentUser && likeQuestion();
					}}>
					<FontAwesomeIcon icon={faThumbsUp} />
				</IconButton>
				<Typography variant='button' style={{ padding: '5px' }}>
					Vote
				</Typography>
				<IconButton
					size='small'
					style={isDisliked ? { color: 'red' } : { color: 'black' }}
					onClick={() => {
						currentUser && dislikeQuestion();
					}}>
					<FontAwesomeIcon icon={faThumbsDown} />
				</IconButton>
				<Typography variant='caption'>
					Dislikes: {dislikes ? dislikes.length : '0'}
				</Typography>
			</Grid>
			<Grid item xs={10} md={11} lg={11}>
				<Typography variant='body2' style={{ color: '#0000008a' }}>
					Posted by{' '}
					{question && question.author
						? question.author.firstName && question.author.lastName
							? question.author.firstName + ' ' + question.author.lastName
							: question.author.email
						: ''}{' '}
					-{' '}
					{question.date
						? moment(question.date).locale('en-gb').format('LLL')
						: ''}
				</Typography>
				<Typography variant='h4'>
					{question.title ? question.title : ''}
				</Typography>
				<Typography variant='body1'>
					{question.text ? question.text : ''}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default QuestionContainer;
