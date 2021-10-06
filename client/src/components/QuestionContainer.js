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
	const { _id, author, title, text, date } = question;

	const { user: currentUser } = useSelector((state) => state.auth);
	const { likes, dislikes } = useSelector((state) => state.rating);
	const dispatch = useDispatch();

	const [isLiked, setIsLiked] = useState(false);
	const [isDisliked, setIsDisliked] = useState(false);

	useEffect(() => {
		_id &&
			dispatch(getQuestionRatings(_id)).then(() => {
				if (currentUser && currentUser.id === author) {
					if (likes.length) {
						setIsDisliked(false);
						setIsLiked(true);
					} else if (dislikes.length) {
						setIsLiked(false);
						setIsDisliked(true);
					}
				} else {
					setIsLiked(false);
					setIsDisliked(false);
				}
			});
	}, [dispatch, _id, currentUser, author, likes.length, dislikes.length]);

	const likeQuestion = () => {
		if (_id) {
			if (!isLiked) {
				if (isDisliked) {
					dispatch(deleteQuestionRating(_id)).then(() => setIsDisliked(false));
				}

				dispatch(
					createRating({ author: currentUser.id, value: 1, question: _id })
				).then(() => setIsLiked(true));
			} else {
				dispatch(deleteQuestionRating(_id)).then(() => setIsLiked(false));
			}

			dispatch(getQuestionRatings(_id));
		}
	};

	const dislikeQuestion = () => {
		if (_id) {
			if (!isDisliked) {
				if (isLiked) {
					dispatch(deleteQuestionRating(_id)).then(() => setIsLiked(false));
				}
				dispatch(
					createRating({ author: currentUser.id, value: 0, question: _id })
				).then(() => setIsDisliked(true));
			} else {
				dispatch(deleteQuestionRating(_id)).then(() => setIsDisliked(false));
			}

			dispatch(getQuestionRatings(_id));
		}
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
					{author
						? author.firstName && author.lastName
							? author.firstName + ' ' + author.lastName
							: author.email
						: ''}{' '}
					- {date ? moment(date).locale('en-gb').format('LLL') : ''}
				</Typography>
				<Typography variant='h4'>{title ? title : ''}</Typography>
				<Typography variant='body1'>{text ? text : ''}</Typography>
			</Grid>
		</Grid>
	);
};

export default QuestionContainer;
