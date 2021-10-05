import React, { Fragment, useEffect } from 'react';
import './index.css';
import Navbar from './components/Navbar';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import NewQuestion from './pages/NewQuestion';
import QuestionDetails from './pages/QuestionDetails';
import Profile from './pages/Profile';

import { useDispatch } from 'react-redux';
import { Route, Switch, useHistory } from 'react-router-dom';
import { clearMessage } from './actions/messageActions';

const App = () => {
	let history = useHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		history.listen((location) => {
			dispatch(clearMessage());
		});
	}, [dispatch, history]);

	return (
		<Fragment>
			<Navbar />
			<div className='root'>
				<Switch>
					<Route exact path='/register' component={Register} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/' component={Home} />
					<Route exact path='/new-question' component={NewQuestion} />
					<Route exact path='/question/:id' component={QuestionDetails} />
					<Route exact path='/profile' component={Profile} />
				</Switch>
			</div>
		</Fragment>
	);
};

export default App;
