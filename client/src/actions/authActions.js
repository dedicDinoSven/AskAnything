import axios from 'axios';
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	SET_MESSAGE
} from './types';
import { createError } from '../helpers';

export const register = (firstName, lastName, email, password) => {
	return async (dispatch) => {
		try {
			const config = {
				headers: {
					'Content-Type': 'application/json'
				}
			};

			const response = await axios.post(
				'/auth/register',
				{
					firstName,
					lastName,
					email,
					password
				},
				config
			);

			dispatch({
				type: REGISTER_SUCCESS
			});

			dispatch({
				type: SET_MESSAGE,
				payload: response.data.message
			});

			return response;
		} catch (err) {
			const message = createError(err);

			dispatch({
				type: REGISTER_FAIL
			});

			dispatch({
				type: SET_MESSAGE,
				payload: message
			});

			return err.response;
		}
	};
};

export const login = (email, password) => async (dispatch) => {
	try {
		const config = {
			headers: {
				'Content-Type': 'application/json'
			}
		};

		const response = await axios.post(
			'/auth/login',
			{ email, password },
			config
		);

		if (response.data.accessToken) {
			localStorage.setItem('user', JSON.stringify(response.data));
			dispatch({
				type: LOGIN_SUCCESS,
				payload: { user: response.data }
			});
		}
	} catch (err) {
		const message = createError(err);

		dispatch({
			type: LOGIN_FAIL
		});

		dispatch({
			type: SET_MESSAGE,
			payload: message
		});
	}
};

export const logout = () => async (dispatch) => {
	try {
		localStorage.removeItem('user');

		dispatch({
			type: LOGOUT
		});
	} catch (err) {
		const message = createError(err);
		console.log(message);
	}
};
