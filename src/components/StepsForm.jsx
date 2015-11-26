const React = require('react');
const update = require('react-addons-update');

const StepsForm = React.createClass({
    getInitialState: function () {
        return {
            steps: []
        }
    },

    keyPress: function (e) {
        if (e.keyCode === 13) { // Enter
            this.saveStep(this.refs.stepInput.value);
        }
    },

    saveStep: function (step) {
        this.setState(update(this.state, {
            steps: {$push: [{
                label: step
            }]}
        }), function () {
            this.refs.stepInput.value = '';
            this.refs.stepInput.placeholder = (this.refs.stepInput.placeholder == 'Given...' ? 'When...' : (this.refs.stepInput.placeholder == 'When...' ? 'Then...' : 'And...'));
            // Todo: save in DB
        });
    },

    render: function () {
        const steps = this.state.steps.map(function (step, i) {
            return (
                <li key={i}>{step.label}</li>
            );
        });
        return (
            <div>
                <h3>Steps</h3>
                <ul>
                {steps}
                </ul>
                <div className="form-group">
                    <input type="text" placeholder="Given..." className="form-control" onKeyDown={this.keyPress} ref="stepInput"/>
                </div>
            </div>
        )
    }
});

module.exports = StepsForm;