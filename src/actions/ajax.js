import { JSONHeaders } from '../utils/utils';
import {
    ADD_FEATURE,
    REMOVE_FEATURE,
    REQUEST_FEATURES,
    RECEIVE_FEATURES,
    REQUEST_STEPS,
    RECEIVE_STEPS,
    ADD_STEP,
    ADD_PENDING_STEP_TO_SCENARIO
} from '../constants/constants';

export function addFeature(feature) {
    return dispatch => {
        return fetch('/api/features', {
            method: 'POST',
            ...JSONHeaders,
            body: JSON.stringify(feature)
        })
            .then(res => res.json())
            .then(json => dispatch({type: ADD_FEATURE, feature: json}));
    }
}

export function removeFeature(_id) {
    return dispatch => {
        return fetch('/api/features', {
            method: 'DELETE',
            ...JSONHeaders,
            body: JSON.stringify({_id: _id})
        })
                .then(() => dispatch({ type: REMOVE_FEATURE, _id }));
    }
}

export function fetchFeatures() {
    return dispatch => {
        dispatch({ type: REQUEST_FEATURES });

        return fetch('/api/features')
            .then(res => res.json())
            .then(json => dispatch({
                type: RECEIVE_FEATURES,
                features: json,
                receivedAt: Date.now()
            }));
    }
}

export function fetchSteps() {
    return dispatch => {
        dispatch({ type: REQUEST_STEPS });

        return fetch('/api/steps')
            .then(res => res.json())
            .then(json => dispatch({
                type: RECEIVE_STEPS,
                steps: json,
                receivedAt: Date.now()
            }));
    }
}

export function addStep(step) {
    let found = step.match(/".*?"|[0-9]+/g);
    let pattern = step.replace(/".*?"/g, '"<String>"').replace(/[0-9]+/g, '<Number>');

    return dispatch => {
        return fetch('/api/steps', {
            method: 'POST',
            ...JSONHeaders,
            body: JSON.stringify({
                pattern: pattern
            })
        })
        .then(res => res.json())
        .then(json => {
            dispatch({type: ADD_STEP, step: json});
            dispatch({type: ADD_PENDING_STEP_TO_SCENARIO, values: found, stepId: json._id, step: json});
        });
    };
}
