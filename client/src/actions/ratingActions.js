import axios from 'axios';
import {
	CREATE_RATING,
	DELETE_QUESTION_RATING,
	GET_QUESTION_RATINGS
} from './types';
import { jwtConfig } from '../helpers';

export const createRating = (data) => async (dispatch) => {
	try {
		const response = await axios.post('/rating/add', data, jwtConfig());

		dispatch({
			type: CREATE_RATING,
			payload: response.data.rating
		});

		return Promise.resolve(response.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const deleteQuestionRating = ({questionId, value}) => async (dispatch) => {
	try {
		await axios.delete(`/rating/question/${questionId}?value=${value}`, jwtConfig());

		dispatch({
			type: DELETE_QUESTION_RATING,
			payload: questionId
		});
	} catch (err) {
		console.log(err.response);
	}
};

export const getQuestionRatings = (questionId) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};
		const response = await axios.get(`/rating/question/${questionId}`, config);

		dispatch({
			type: GET_QUESTION_RATINGS,
			payload: {
				likes: response.data.likes,
				dislikes: response.data.dislikes
			}
		});
	} catch (err) {
		console.log(err.response);
	}
};
