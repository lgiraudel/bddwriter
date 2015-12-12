import React, { Component } from 'react';
import AddFeature from '../components/AddFeature.jsx';
import { connect } from 'react-redux';
import { addFeature, toggleScenarioForm, addScenario, removeScenario, addStep } from '../actions/actions';

class FeatureFormPage extends Component {
    render() {
        let { dispatch } = this.props;

        return (
            <AddFeature
                scenarios={this.props.scenarios}
                scenarioFormVisible={this.props.scenarioFormVisible}
                onSaveClick={feature => this.onSave(feature)}
                onToggleScenarioFormClick={() => dispatch(toggleScenarioForm())}
                onScenarioSaveClick={scenario => dispatch(addScenario(scenario))}
                onScenarioRemoveClick={scenario => dispatch(removeScenario(scenario))}
                onStepSave={step => dispatch(addStep(step))}
                steps={this.props.steps}
                currentSteps={this.props.currentSteps}
            />
        )
    }

    onSave(feature) {
        let { dispatch } = this.props;

        dispatch(addFeature(feature))
        this.props.history.pushState('/features');
    }
}

function select(state) {
    return {
        scenarios: state.forms.featureCreationForm.scenarios,
        scenarioFormVisible: state.ui.scenarioFormVisible,
        steps: state.steps,
        currentSteps: state.forms.featureCreationForm.currentSteps,
        hhistory: state.history
    };
}

export default connect(select)(FeatureFormPage);