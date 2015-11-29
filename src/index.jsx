import React from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import bddApp from './reducers/reducers';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware,
    loggerMiddleware
)(createStore);

let store = createStoreWithMiddleware(bddApp);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.getElementById('react-container')
);
