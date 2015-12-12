import { combineReducers } from 'redux';

import features from './features';
import ui from './ui';
import forms from './forms';
import steps from './steps';

const bddApp = {
    features: features,
    ui: ui,
    forms: forms,
    steps: steps
};

export default bddApp;
