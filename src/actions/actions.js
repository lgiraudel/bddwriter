import fetch from 'isomorphic-fetch';

import { TOGGLE_SCENARIO_FORM, ADD_SCENARIO, REMOVE_SCENARIO, ADD_STEP } from '../constants/constants';

import { addFeature, removeFeature, fetchFeatures, addStep, fetchSteps } from './ajax';
export { addFeature, removeFeature, fetchFeatures, addStep, fetchSteps };

export function toggleScenarioForm() {
    return {
        type: TOGGLE_SCENARIO_FORM
    }
}

export function addScenario(scenario) {
    return {
        type: ADD_SCENARIO,
        scenario: scenario
    };
}

export function removeScenario(scenario) {
    return {
        type: REMOVE_SCENARIO,
        scenario: scenario
    };
}
