import {
	CREATE_RATING,
	DELETE_QUESTION_RATING,	
	GET_QUESTION_RATINGS,
} from '../actions/types';

const initialState = {
	rating: [],
	likes: [],
	dislikes: [],
};

export default function ratingReducer(state = initialState, action) {
	switch (action.type) {
		case CREATE_RATING:
			return { ...state, rating: action.payload };
		case GET_QUESTION_RATINGS:
			return {
				likes: action.payload.likes,
				dislikes: action.payload.dislikes
			};
		case DELETE_QUESTION_RATING:
			return {
				likes: state.likes.filter(
					(question) => question !== action.payload.questionId
				),
				dislikes: state.dislikes.filter(
					(question) => question !== action.payload.questionId
				)
			};
		default:
			return state;
	}
}
