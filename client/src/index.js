import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import App from './components/App';
import Welcome from './components/Welcome';
import Signup from './components/auth/Signup';
import Signout from './components/auth/Signout';
import Signin from './components/auth/Signin';
import Feature from './components/Feature';
import rootReducer from './reducers';

const listMiddlewares = [thunk];
let middlewares = null;

if (process.env.NODE_ENV === 'development') {
	middlewares = composeWithDevTools(applyMiddleware(...listMiddlewares));
} else {
	middlewares = applyMiddleware(...listMiddlewares);
}

const store = createStore(
	rootReducer,
	{
		auth: {
			authenticated: localStorage.getItem('token'),
		},
	},
	middlewares
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App>
				<Switch>
					<Route path="/" exact component={Welcome} />
					<Route path="/sign-up" exact component={Signup} />
					<Route path="/sign-out" exact component={Signout} />
					<Route path="/sign-in" exact component={Signin} />
					<Route path="/feature" exact component={Feature} />
				</Switch>
			</App>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);
