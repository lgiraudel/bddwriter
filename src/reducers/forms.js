import { ADD_FEATURE, ADD_SCENARIO, REMOVE_SCENARIO, ADD_PENDING_STEP_TO_SCENARIO } from '../constants/constants';
import slug from 'slug';

export default function forms(state = {
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
        case ADD_PENDING_STEP_TO_SCENARIO:
            return {
                ...state,
                featureCreationForm: {
                    ...state.featureCreationForm,
                    currentSteps: [
                        ...state.featureCreationForm.currentSteps,
                        { stepId: action.stepId, values: action.values, step: action.step }
                    ]
                }
            }
        default:
            return state;
    }
}
