import React, { useState, useEffect, Fragment } from 'react';
import Fade from '@material-ui/core/Fade';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faThumbsUp,
	faThumbsDown,
	faEllipsisV
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { updateAnswer, deleteAnswer } from '../actions/answerActions';
import { createRating } from '../actions/ratingActions';
import Modal from './Modal';
import AnswerForm from './AnswerForm';
import moment from 'moment';
import 'moment/locale/en-gb';
import axios from 'axios';
import { jwtConfig } from '../helpers';

const AnswerContainer = ({ answer, getQuestion }) => {
	const [open, setOpen] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);

	const [likes, setLikes] = useState(0);
	const [isLiked, setIsLiked] = useState(false);
	const [dislikes, setDislikes] = useState(0);
	const [isDisliked, setIsDisliked] = useState(false);

	const { _id, author, text, date, question } = answer;

	const { user: currentUser } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const getRatings = (answerId, questionId) => {
		axios.get(`/rating/answer/${answerId}/${questionId}`).then((response) => {
			if (response.data) {
				setLikes(response.data.likes.length);
				setDislikes(response.data.dislikes.length);

				response.data.likes.map((like) => {
					if (currentUser && like.author === currentUser.id) {
						setIsLiked(true);
					}
					return true;
				});

				response.data.dislikes.map((dislike) => {
					if (currentUser && dislike.author === currentUser.id) {
						setIsDisliked(true);
					}
					return true;
				});
			}
		});
	};

	useEffect(() => {
		getRatings(_id, question);
	});

	const updateAnswerHandler = (values, props) => {
		props.setSubmitting(false);
		dispatch(updateAnswer(_id, values.text))
			.then(() => {
				props.setSubmitting(false);
				props.resetForm();
				getQuestion(question);
				setOpen(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const deleteAnswerHandler = () => {
		dispatch(deleteAnswer(_id))
			.then(() => {
				getQuestion(question);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const likeAnswer = async () => {
		let answerId = _id;

		if (!isLiked) {
			dispatch(
				createRating({ author: currentUser.id, value: 1, answer: _id })
			).then(() => {
				setLikes(likes + 1);
				setIsLiked(true);
			});

			if (isDisliked) {
				await axios.delete(
					`/rating/answer/${answerId}?value=${0}`,
					jwtConfig()
				);
				setIsDisliked(false);
				setDislikes(dislikes - 1);
			}
		} else {
			await axios.delete(`/rating/answer/${answerId}?value=${1}`, jwtConfig());
			setLikes(likes - 1);
			setIsLiked(false);
		}
	};

	const dislikeAnswer = async () => {
		let answerId = _id;
		if (!isDisliked) {
			dispatch(
				createRating({ author: currentUser.id, value: 0, answer: _id })
			).then(() => {
				setDislikes(dislikes + 1);
				setIsDisliked(true);
			});

			if (isLiked) {
				await axios.delete(
					`/rating/answer/${answerId}?value=${1}`,
					jwtConfig()
				);
				setIsLiked(false);
				setLikes(likes - 1);
			}
		} else {
			await axios.delete(`/rating/answer/${answerId}?value=${0}`, jwtConfig());
			setDislikes(dislikes - 1);
			setIsDisliked(false);
		}
	};

	return (
		<Fragment>
			<Grid container spacing={0} style={{ padding: '15px 0px' }}>
				<Grid
					item
					container
					direction='column'
					alignItems='center'
					xs={2}
					md={1}
					lg={1}>
					<Typography variant='caption'>Likes: {likes}</Typography>
					<IconButton
						size='small'
						style={isLiked ? { color: 'green' } : { color: 'black' }}
						onClick={() => {
							currentUser && likeAnswer();
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
							currentUser && dislikeAnswer();
						}}>
						<FontAwesomeIcon icon={faThumbsDown} />
					</IconButton>
					<Typography variant='caption'>Dislikes: {dislikes}</Typography>
				</Grid>
				<Grid item container direction='column' xs={10} md={11} lg={11}>
					<Grid item container>
						<Grid item xs={11}>
							<Typography variant='body2' style={{ color: '#0000008a' }}>
								Answered by{' '}
								{author
									? author.firstName && author.lastName
										? author.firstName + ' ' + author.lastName
										: author.email
									: ''}{' '}
								- {date ? moment(date).locale('en-gb').format('LLL') : ''}
							</Typography>
						</Grid>
						<Grid item xs={1} container justifyContent='flex-end'>
							{currentUser && currentUser.id === author._id && (
								<Fragment>
									<IconButton
										size='small'
										edge='end'
										onClick={(e) => setAnchorEl(e.currentTarget)}>
										<FontAwesomeIcon icon={faEllipsisV} />
									</IconButton>
									<Menu
										anchorEl={anchorEl}
										keepMounted
										open={Boolean(anchorEl)}
										onClose={() => setAnchorEl(null)}
										TransitionComponent={Fade}>
										<MenuItem
											onClick={() => {
												setAnchorEl(null);
												setOpen(true);
											}}>
											Edit
										</MenuItem>
										<MenuItem
											onClick={() => {
												setAnchorEl(null);
												deleteAnswerHandler();
											}}>
											Delete
										</MenuItem>
									</Menu>
								</Fragment>
							)}
						</Grid>
					</Grid>
					<Grid item>
						<Typography variant='body1'>{text ? text : ''}</Typography>
					</Grid>
				</Grid>
			</Grid>
			<Modal title='Edit answer' open={open} onClose={() => setOpen(false)}>
				<AnswerForm onSubmit={updateAnswerHandler} text={text} />
			</Modal>
		</Fragment>
	);
};

export default AnswerContainer;
