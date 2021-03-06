import React, { Component } from 'react';
import slug from 'slug';
import StepForm from './StepForm.jsx';

export default class AddFeature extends Component {
    render() {
        return (
            <div>
                <div className='form-group'>
                    <label htmlFor='title'>Title</label>
                    <input className='form-control' type='text' ref='title' id='title'/>
                </div>
                <div className='form-group'>
                    <label htmlFor='description'>Description</label>
                    <textarea className='form-control' ref='description'></textarea>
                </div>
                <h2>Scenarios</h2>
                <button className='btn btn-default' onClick={e => this.handleShowScenarioFormClick()} style={{display: this.props.scenarioFormVisible ? 'none' : 'block'}}>Add scenario</button>
                {this.props.scenarios.map(scenario =>
                    <div key={scenario._id ? scenario._id : slug(scenario.title)} className='panel panel-default'>
                        <div className='panel-heading'>
                            <div className='row'>
                                <div className='col-sm-8'>Scenario: {scenario.title}</div>
                                <div className='col-sm-4 text-right'>
                                    <a className='glyphicon glyphicon-remove' onClick={() => this.handleRemoveScenarioClick(scenario)}></a>
                                </div>
                            </div>
                        </div>
                        <div className='panel-body'>{scenario.description}</div>
                    </div>
                )}
                <div style={{display: this.props.scenarioFormVisible ? 'block' : 'none' }} className='panel panel-primary'>
                    <div className='panel-heading'>New scenario</div>
                    <div className='panel-body'>
                        <div className='form-group'>
                            <label htmlFor='scenario-title'>Title</label>
                            <input type='text' id='scenario-title' className='form-control' ref='scenarioTitle'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='scenario-description'>Description</label>
                            <input type='text' id='scenario-description' className='form-control' ref='scenarioDescription'/>
                        </div>
                        <StepForm
                            currentSteps={this.props.currentSteps}
                            steps={this.props.steps}
                            onStepSave={this.props.onStepSave}
                        />
                        <button className='btn btn-primary' onClick={() => this.handleScenarioSaveClick()}>Save scenario</button>
                    </div>
                </div>
                <button className='btn btn-primary' onClick={e => this.handleSaveClick(e)}>Save</button>&nbsp;
                <button className='btn btn-default' onClick={e => this.props.onCancelClick(e)}>Cancel</button>
            </div>
        )
    }

    handleSaveClick(e) {
        const title = this.refs.title.value;
        const description = this.refs.description.value;
        this.props.onSaveClick({
            title,
            description,
            scenarios: this.props.scenarios
        });
        this.refs.title.value = '';
        this.refs.description.value = '';
    }

    handleShowScenarioFormClick() {
        this.props.onToggleScenarioFormClick();
    }

    handleScenarioSaveClick() {
        const scenarioTitle = this.refs.scenarioTitle.value;
        const scenarioDescription = this.refs.scenarioDescription.value;

        this.props.onScenarioSaveClick({
            title: scenarioTitle,
            description: scenarioDescription,
            steps: this.props.currentSteps
        });

        this.refs.scenarioTitle.value = '';
        this.refs.scenarioDescription.value = '';
    }

    handleRemoveScenarioClick(scenario) {
        this.props.onScenarioRemoveClick(scenario);
    }
}
