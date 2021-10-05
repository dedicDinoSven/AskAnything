import {
	CREATE_ANSWER,
	EDIT_ANSWER,
	DELETE_ANSWER,
	GET_MOST_ANSWERS_LIST
} from '../actions/types';

const initialState = [];

export default function answerReducer(answers = initialState, action) {
	switch (action.type) {
		case CREATE_ANSWER:
			return [...answers, action.payload];
		case EDIT_ANSWER:
			return answers.map((answer) => {
				if (answer.id === action.payload.id) {
					return {
						...answer,
						...action.payload
					};
				} else {
					return answer;
				}
			});
		case DELETE_ANSWER:
			return answers.filter((id) => id !== action.payload.id);
		case GET_MOST_ANSWERS_LIST:
			return action.payload;
		default:
			return answers;
	}
}
