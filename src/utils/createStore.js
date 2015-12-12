import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import { devTools } from 'redux-devtools';
import { routerStateReducer, reduxReactRouter } from 'redux-router';
import { createHistory } from 'history';
import reducers from '../reducers/reducers';

export default function(routes) {
    const composedReducers = combineReducers({
        router: routerStateReducer,
        ...reducers
    });

    const loggerMiddleware = createLogger();
    const createStoreWithMiddleware = compose(
        applyMiddleware(thunkMiddleware, loggerMiddleware),
        reduxReactRouter({
            routes,
            createHistory
        }),
        devTools()
    )(createStore);

    return createStoreWithMiddleware(composedReducers);
}
