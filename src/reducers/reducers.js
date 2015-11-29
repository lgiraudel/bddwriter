import { combineReducers } from 'redux';
import { ADD_FEATURE, REMOVE_FEATURE, REQUEST_FEATURES, RECEIVE_FEATURES, TOGGLE_SCENARIO_FORM, ADD_SCENARIO, REMOVE_SCENARIO, ADD_STEP } from '../actions/actions';
import slug from 'slug';

function features(state = [], action) {
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

function ui(state = {
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

function forms(state = {
    featureCreationForm: {
        scenarios: [],
        currentSteps: []
    }
}, action) {
    switch (action.type) {
        case ADD_SCENARIO:
            return {
                ...state,
                featureCreationForm: {
                    ...state.featureCreationForm,
                    scenarios: [
                        ...state.featureCreationForm.scenarios,
                        action.scenario
                    ],
                    currentSteps: []
                }
            };
        case REMOVE_SCENARIO:
            let scenarioFiltered = [];
            let scenarios = state.featureCreationForm.scenarios;
            if (action.scenario._id) {
                scenarioFiltered = scenarios.filter(scenario => action.scenario._id !== scenario._id);
            } else {
                scenarioFiltered = scenarios.filter(scenario => slug(action.scenario.title) !== slug(scenario.title));
            }

            return {
                ...state,
                featureCreationForm: {
                    ...state.featureCreationForm,
                    scenarios: scenarioFiltered
                }
            };
        case ADD_FEATURE:
            return {
                ...state,
                featureCreationForm: {
                    ...state.featureCreationForm,
                    scenarios: []
                }
            }
        case ADD_STEP:
            return {
                ...state,
                featureCreationForm: {
                    ...state.featureCreationForm,
                    currentSteps: [
                        ...state.featureCreationForm.currentSteps,
                        action.step
                    ]
                }
            }
        default:
            return state;
    }
}

function steps(state = [], action) {
    switch (action.type) {
        // case SAVE_STEP:
        //     return [
        //         ...state,
        //         action.step
        //     ];
        default:
            return state;
    }
}

const bddApp = combineReducers({
    features: features,
    ui: ui,
    forms: forms,
    steps: steps
});

export default bddApp;
