import { combineReducers } from 'redux';
import slug from 'slug';

import features from './features';
import ui from './ui';
import forms from './forms';
import steps from './steps';

const bddApp = combineReducers({
    features: features,
    ui: ui,
    forms: forms,
    steps: steps
});

export default bddApp;
