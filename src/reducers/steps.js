import { RECEIVE_STEPS, ADD_STEP } from '../constants/constants';

export default function steps(state = [], action) {
    switch (action.type) {
        case RECEIVE_STEPS:
            return [
                ...state,
                ...action.steps
            ];
        case ADD_STEP:
            return [
                ...state,
                action.step
            ]
        default:
            return state;
    }
}
