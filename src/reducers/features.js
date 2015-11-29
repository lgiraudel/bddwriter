import { ADD_FEATURE, REMOVE_FEATURE, RECEIVE_FEATURES } from '../actions/actions';

export default function features(state = [], action) {
    switch (action.type) {
        case ADD_FEATURE:
            return [
                ...state,
                action.feature
            ];
        case REMOVE_FEATURE:
            return [
                ...state.filter(feature => feature._id !== action._id)
            ];
        case RECEIVE_FEATURES:
            return [
                ...state,
                ...action.features
            ]
        default:
            return state;
    }
}
