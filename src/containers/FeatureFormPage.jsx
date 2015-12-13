import React, { Component } from 'react';
import AddFeature from '../components/AddFeature.jsx';
import { connect } from 'react-redux';
import { addFeature, toggleScenarioForm, addScenario, removeScenario, addStep } from '../actions/actions';
import { pushState } from 'redux-router';

class FeatureFormPage extends Component {
    render() {
        return (
            <AddFeature
                scenarios={this.props.scenarios}
                scenarioFormVisible={this.props.scenarioFormVisible}
                onSaveClick={feature => this.onSave(feature)}
                onToggleScenarioFormClick={() => this.props.toggleScenarioForm()}
                onScenarioSaveClick={scenario => this.props.addScenario(scenario)}
                onScenarioRemoveClick={scenario => this.props.removeScenario(scenario)}
                onStepSave={step => this.props.addStep(step)}
                steps={this.props.steps}
                currentSteps={this.props.currentSteps}
                onCancelClick={e => this.props.pushState('/features')}
            />
        )
    }

    onSave(feature) {
        this.props.addFeature(feature);
        this.props.pushState('/features');
    }
}

function select(state) {
    return {
        scenarios: state.forms.featureCreationForm.scenarios,
        scenarioFormVisible: state.ui.scenarioFormVisible,
        steps: state.steps,
        currentSteps: state.forms.featureCreationForm.currentSteps
    };
}

export default connect(select, {
    pushState,
    addStep,
    toggleScenarioForm,
    addScenario,
    removeScenario,
    addFeature
})(FeatureFormPage);
