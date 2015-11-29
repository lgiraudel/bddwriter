import { REQUEST_FEATURES, RECEIVE_FEATURES, TOGGLE_SCENARIO_FORM, ADD_SCENARIO } from '../constants/constants';

export default function ui(state = {
    isFetching: false,
    scenarioFormVisible: false
}, action) {
    switch (action.type) {
        case REQUEST_FEATURES:
            return {
                ...state,
                isFetching: true
            };
        case RECEIVE_FEATURES:
            return {
                ...state,
                isFetching: false
            };
        case TOGGLE_SCENARIO_FORM:
            return {
                ...state,
                scenarioFormVisible: !state.scenarioFormVisible
            };
        case ADD_SCENARIO:
            return {
                ...state,
                scenarioFormVisible: false
            };
        default:
            return state;
    }
}
