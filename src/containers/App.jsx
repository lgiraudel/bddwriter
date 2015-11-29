import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFeature, removeFeature, fetchFeatures, toggleScenarioForm, addScenario, removeScenario, addStep } from '../actions/actions';
import AddFeature from '../components/AddFeature.jsx';
import FeatureList from '../components/FeatureList.jsx';

class App extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFeatures());
    }

    render() {
        const {
            dispatch,
            features,
            ui: {scenarioFormVisible: scenarioFormVisible},
            forms: {featureCreationForm: {scenarios: scenarios, currentSteps: currentSteps }},
            steps
        } = this.props;

        return (
            <div className='container-fluid'>
                <div className='navbar navbar-default'>
                    <div className='container-fluid'>
                        <span className='navbar-brand'>BDD Writer</span>
                        <ul className='nav navbar-nav'>
                            <li><a>Features</a></li>
                            <li><a>Import/Export</a></li>
                        </ul>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>Add feature</div>
                        <div className='panel-body'>
                            <AddFeature
                                scenarios={scenarios}
                                scenarioFormVisible={scenarioFormVisible}
                                onSaveClick={feature => dispatch(addFeature(feature))}
                                onToggleScenarioFormClick={() => dispatch(toggleScenarioForm())}
                                onScenarioSaveClick={scenario => dispatch(addScenario(scenario))}
                                onScenarioRemoveClick={scenario => dispatch(removeScenario(scenario))}
                                onStepSave={step => dispatch(addStep(step))}
                                steps={steps}
                                currentSteps={currentSteps}
                            />
                        </div>
                    </div>
                </div>
                <div className='col-sm-6'>
                    <div className='panel panel-default'>
                        <div className='panel-heading'>Features</div>
                        <div className='panel-body'>
                            <FeatureList features={features} onRemoveClick={_id => dispatch(removeFeature(_id))}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function select(state) {
    return {
        features: state.features,
        ui: state.ui,
        forms: state.forms,
        steps: state.steps
    }
}

export default connect(select)(App);
