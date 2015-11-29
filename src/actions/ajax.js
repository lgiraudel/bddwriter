import { JSONHeaders } from '../utils/utils';
import { ADD_FEATURE, REMOVE_FEATURE, REQUEST_FEATURES, RECEIVE_FEATURES } from '../constants/constants';

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

export function fetchFeatures() {
    return dispatch => {
        dispatch({ type: REQUEST_FEATURES });

        return fetch('/features')
            .then(req => req.json())
            .then(json => dispatch({
                type: RECEIVE_FEATURES,
                features: json,
                receivedAt: Date.now()
            }));
    }
}
