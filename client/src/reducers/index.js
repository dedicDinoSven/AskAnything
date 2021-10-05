import { combineReducers } from 'redux';
import message from './message';
import auth from './auth';
import question from './question';
import answer from './answer';
import user from './user';
import rating from './rating';

export default combineReducers({
	auth,
	message,
	question,
	answer,
	user,
	rating
});
