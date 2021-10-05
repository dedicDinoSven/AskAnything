import axios from 'axios';
import { CREATE_QUESTION, GET_ALL_QUESTIONS } from './types';
import { jwtConfig } from '../helpers';

export const createQuestion = (title, text) => async (dispatch) => {
	try {
		const response = await axios.post(
			'/question/add-new',
			{ title, text },
			jwtConfig()
		);

		dispatch({
			type: CREATE_QUESTION,
			payload: response.data
		});

		return Promise.resolve(response.data);
	} catch (err) {
		return Promise.reject(err);
	}
};

export const getAllQuestions = () => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response = await axios.get('/question/all', config);

		dispatch({
			type: GET_ALL_QUESTIONS,
			payload: response.data
		});
	} catch (err) {
		console.log(err.response);
	}
};

