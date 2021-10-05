import {
	GET_PROFILE_DETAILS,
	UPDATE_PROFILE_DETAILS,
	UPDATE_PASSWORD
} from '../actions/types';

const initialState = {
	user: {},
	numberOfAnswers: 0,
	numberOfQuestions: 0
};

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		case GET_PROFILE_DETAILS:
			return {
				...state,
				user: action.payload.user,
				numberOfAnswers: action.payload.numberOfAnswers,
				numberOfQuestions: action.payload.numberOfQuestions
			};
		case UPDATE_PROFILE_DETAILS:
		case UPDATE_PASSWORD:
			return { ...state }
		default:
			return state;
	}
}
