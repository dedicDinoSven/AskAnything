import axios from 'axios';
import {
	GET_PROFILE_DETAILS,
	UPDATE_PROFILE_DETAILS,
	UPDATE_PASSWORD,
	SET_MESSAGE
} from './types';
import { jwtConfig, createError } from '../helpers';

export const getProfileDetails = () => async (dispatch) => {
	try {
		const response = await axios.get('/user/profile', jwtConfig());

		dispatch({
			type: GET_PROFILE_DETAILS,
			payload: {
				user: response.data.user,
				numberOfAnswers: response.data.numberOfAnswers,
				numberOfQuestions: response.data.numberOfQuestions
			}
		});
	} catch (err) {
		const message = createError(err);

		dispatch({
			type: SET_MESSAGE,
			payload: message
		});
	}
};

export const updateProfileDetails = (details) => async (dispatch) => {
	try {
		const response = await axios.patch(
			'/user/profile/update-details',
			details,
			jwtConfig()
		);

		dispatch({
			type: UPDATE_PROFILE_DETAILS,
			payload: response.data
		});

		dispatch({
			type: SET_MESSAGE,
			payload: response.data.message 
		});

		return Promise.resolve(response.data);
	} catch (err) {
		const message = createError(err);

		dispatch({
			type: SET_MESSAGE,
			payload: message
		});

		return Promise.reject(err);
	}
};

export const updatePassword = (password) => async (dispatch) => {
	try {
		const response = await axios.put(
			'/user/profile/change-password',
			{ password },
			jwtConfig()
		);

		dispatch({
			type: UPDATE_PASSWORD,
			payload: response.data
		});

		dispatch({
			type: SET_MESSAGE,
			payload: response.data.message
		});

		return Promise.resolve(response.data);
	} catch (err) {
		const message = createError(err);

		dispatch({
			type: SET_MESSAGE,
			payload: message
		});

		return Promise.reject(err);
	}
};
