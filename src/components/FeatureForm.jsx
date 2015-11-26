const React = require('react');
const ScenarioForm = require('./ScenarioForm.jsx');

const FeatureForm = React.createClass({
    save: function (e) {
        e.preventDefault();

        const title = this.refs.title.value;
        const description = this.refs.description.value;
        const scenarios = this.refs.scenarioForm.state.scenarios;

        console.log(this.refs.scenarioForm);

        $.ajax({
            url: this.props.source,
            method: 'post',
            dataType: 'json',
            data: {
                title: title,
                description: description,
                scenarios: scenarios
            }
        }).done(res => this.props.onFeatureCreated(res));
    },

    render: function () {
        return (
            <div className="panel panel-primary">
                <div className="panel-body">
                    <h1>New feature</h1>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" id="title" className="form-control" ref="title"></input>
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea className="form-control" id="description" ref="description"></textarea>
                    </div>
                    <ScenarioForm ref="scenarioForm"/>
                    <button onClick={this.save} className="btn btn-primary">Save</button>
                </div>
            </div>
        );
    }
});

module.exports = FeatureForm;