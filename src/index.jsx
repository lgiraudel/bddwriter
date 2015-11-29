import React from 'react';
import { render } from 'react-dom';
import { compose, createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { Provider } from 'react-redux';
import { devTools, persistState } from 'redux-devtools';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import App from './containers/App.jsx';
import bddApp from './reducers/reducers';

const loggerMiddleware = createLogger();
const createStoreWithMiddleware = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware),
    devTools(),
    persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
)(createStore);

let store = createStoreWithMiddleware(bddApp);

render(
    <div className='row'>
        <div className='col-sm-9'>
            <Provider store={store}>
                <App/>
            </Provider>
        </div>
        <div className='col-sm-3'>
            <DebugPanel rigth top bottom>
                <DevTools store={store} monitor={LogMonitor}></DevTools>
            </DebugPanel>
        </div>
    </div>,
    document.getElementById('react-container')
);
