import axios from 'axios';
import {
	CREATE_ANSWER,
	EDIT_ANSWER,
	DELETE_ANSWER,
	GET_MOST_ANSWERS_LIST
} from './types';
import { jwtConfig } from '../helpers';

export const createAnswer = (text, id) => async (dispatch) => {
	try {
		const response = await axios.post(
			`/answer/add-new/${id}`,
			{ text },
			jwtConfig()
		);

		dispatch({
			type: CREATE_ANSWER,
			payload: response.data
		});
		return Promise.resolve(response.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const updateAnswer = (id, text) => async (dispatch) => {
	try {
		const response = await axios.put(`/answer/${id}`, { text }, jwtConfig());

		dispatch({
			type: EDIT_ANSWER,
			payload: text
		});

		return Promise.resolve(response.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const deleteAnswer = (id) => async (dispatch) => {
	try {
		const response = await axios.delete(`/answer/${id}`, jwtConfig());

		dispatch({
			type: DELETE_ANSWER,
			payload: { id }
		});
		console.log(response);
	} catch (err) {
		console.log(err);
	}
};

export const getMostAnswersList = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response = await axios.get('/answer/most-active-users', config);

		dispatch({
			type: GET_MOST_ANSWERS_LIST,
			payload: response.data
		});
	} catch (err) {
		console.log(err);
	}
};
