import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import { Route, IndexRoute } from 'react-router';
import createStore from './utils/createStore';
import { ReduxRouter } from 'redux-router';

import App from './containers/App.jsx';
import FeaturesPage from './containers/FeaturesPage.jsx';
import FeatureFormPage from './containers/FeatureFormPage.jsx';


const routes = (
    <Route path='/' component={App}>
        <Route path='features' component={FeaturesPage}></Route>
        <Route path='feature/new' component={FeatureFormPage}></Route>
        <IndexRoute component={FeaturesPage}/>
    </Route>
);

let store = createStore(routes);

render(
    <div className='row'>
        <div className='col-sm-9'>
            <Provider store={store}>
                <ReduxRouter>
                    {routes}
                </ReduxRouter>
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
