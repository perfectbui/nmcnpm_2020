import './App.css';
import { Component, useEffect } from 'react';
import { Route } from 'react-router-dom';
import Cookies from 'js-cookie';
import { connect } from 'react-redux';

import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Jobs from './components/Jobs/Jobs';
import Test from './components/Test/Test'
import Notifications from './components/Notifications/Notifications';
import SignIn from './components/Auth/SignIn/SignIn';
import SignUp from './components/Auth/SignUp/SignUp';
import SignOut from './components/Auth/SignOut/SignOut';
import { parseJwt } from './utils';
import * as actions from './store/action/index';

class App extends Component {
	componentDidMount() {
		if (Cookies.get('headerAndPayload')) {
			const dataUser = parseJwt(Cookies.get('headerAndPayload'));
			this.props.saveAuth(dataUser);
		}
	}

	render() {
		return (
			<div className="App">
				<Layout>
					{/* <Route path="/" exact component={Home} /> */}
					<Route path="/" exact component={Jobs} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signout" component={SignOut} />
					<Route path="/home" component={Home} />
					<Route path="/notifications" component={Notifications} />
					<Route path="/signup" component={SignUp} />
					<Route path="/test/:id" component={Test}/>
				</Layout>
			</div>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		saveAuth: (dataUser) => dispatch(actions.saveAuth(dataUser)),
	};
};

export default connect(null, mapDispatchToProps)(App);
