const React = require('react');
const update = require('react-addons-update');
const slug = require('slug');
const StepsForm = require('./StepsForm.jsx');

const ScenarioForm = React.createClass({
    getInitialState: function () {
        return {
            scenarios: [],
            scenarioFormIsVisible: false
        };
    },

    showScenarioForm: function (e) {
        e.preventDefault();

        this.setState(update(this.state, {
            scenarioFormIsVisible: {$set: true}
        }));
    },

    hideScenarioForm: function () {
        this.setState(update(this.state, {
            scenarioFormIsVisible: {$set: false}
        }));
    },

    saveScenario: function (e) {
        e.preventDefault();

        const title = this.refs.scenarioTitle.value;
        const description = this.refs.scenarioDescription.value;

        this.setState(update(this.state, {
            scenarios: {$push: [{title: title, description: description}]}
        }), this.clearScenarioForm);
    },

    clearScenarioForm: function (e) {
        e ? e.preventDefault() : null;

        this.refs.scenarioTitle.value = '';
        this.refs.scenarioDescription.value = '';

        this.hideScenarioForm();
    },

    removeScenario: function (scenarioToDelete, e) {
        e.preventDefault();
        console.log(arguments);

        const filteredScenarios = this.state.scenarios.filter(function (scenario) {
            return scenarioToDelete._id ? scenarioToDelete !== scenario._id : slug(scenarioToDelete.title) !== slug(scenario.title)
        });

        console.log(filteredScenarios);

        this.setState(update(this.state, {
            scenarios: {$set: filteredScenarios}
        }));
    },

    renderScenarios: function () {
        return this.state.scenarios.map(function (scenario) {
            return (
                <div key={scenario._id ? scenario._id : slug(scenario.title)} className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-sm-8">Scenario: {scenario.title}</div>
                            <div className="col-sm-4 text-right">
                                <a className="glyphicon glyphicon-remove" href="#" onClick={this.removeScenario.bind(this, scenario)}></a>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">{scenario.description}</div>
                </div>
            );
        }.bind(this));
    },

    render: function () {
        return (
            <div>
                <h2>Scenarios</h2>
                <a className="btn btn-default" onClick={this.showScenarioForm} style={{display: this.state.scenarioFormIsVisible ? 'none' : 'inline'}}>Add scenario</a>
                <ul>
                {this.renderScenarios()}
                </ul>
                <div style={{ display: this.state.scenarioFormIsVisible ? 'block' : 'none' }} className="panel panel-primary">
                    <div className="panel-heading">New scenario</div>
                    <div className="panel-body">
                        <div className="form-group">
                            <label htmlFor="scenario-title">Title</label>
                            <input type="text" id="scenario-title" className="form-control" ref="scenarioTitle"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="scenario-description">Description</label>
                            <textarea id="scenario-description" className="form-control" ref="scenarioDescription"></textarea>
                        </div>
                        <StepsForm/>
                        <a className="btn btn-primary" href="#" onClick={this.saveScenario}>Save</a>
                        <a className="btn btn-default" href="#" onClick={this.clearScenarioForm}>Cancel</a>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = ScenarioForm;