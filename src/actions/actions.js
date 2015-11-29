import fetch from 'isomorphic-fetch';

import { JSONHeaders } from '../utils/utils';
import { ADD_FEATURE, REMOVE_FEATURE, REQUEST_FEATURES, RECEIVE_FEATURES, TOGGLE_SCENARIO_FORM, ADD_SCENARIO, REMOVE_SCENARIO, ADD_STEP } from '../constants/constants';

export function addFeature(feature) {
    return dispatch => {
        return fetch('/features', {
            method: 'POST',
            ...JSONHeaders,
            body: JSON.stringify(feature)
        })
            .then(req => req.json())
            .then(json => dispatch({type: ADD_FEATURE, feature: json}));
    }
}

export function removeFeature(_id) {
    return dispatch => {
        return fetch('/features', {
            method: 'DELETE',
            ...JSONHeaders,
            body: JSON.stringify({_id: _id})
        })
                .then(() => dispatch({ type: REMOVE_FEATURE, _id }));
    }
}

function requestsFeatures() {
    return {
        type: REQUEST_FEATURES
    };
}

function receiveFeatures(json) {
    return {
        type: RECEIVE_FEATURES,
        features: json,
        receivedAt: Date.now()
    }
}

export function fetchFeatures() {
    return dispatch => {
        dispatch(requestsFeatures());
        return fetch('/features')
            .then(req => req.json())
            .then(json => dispatch(receiveFeatures(json)));
    }
}

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

export function addStep(step) {
    return {
        type: ADD_STEP,
        step: step
    };
}
