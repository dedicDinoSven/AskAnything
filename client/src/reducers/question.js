import { CREATE_QUESTION, GET_ALL_QUESTIONS } from '../actions/types';

const initialState = [];

export default function questionReducer(questions = initialState, action) {
	switch (action.type) {
		case CREATE_QUESTION:
			return [...questions, action.payload];
		case GET_ALL_QUESTIONS:
			return action.payload;
		default:
			return questions;
	}
}
