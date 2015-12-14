import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import ValuesCreationTable from './ValuesCreationTable.jsx';

export default class StepForm extends Component {
    constructor() {
        super();
        this.state = {
            valuesCreationTableVisible: false
        }
    }

    getValuesCreationTableToggler() {
        return (
            <div className='checkbox'>
                <label>
                    <input type='checkbox' onChange={() => this.showValuesCreationTable()}/> With table
                </label>
            </div>
        );
    }

    render() {
        const valuesCreationTableToggler = this.state.valuesCreationTableVisible ? null : this.getValuesCreationTableToggler();
        const valuesCreationTable = this.state.valuesCreationTableVisible ? <ValuesCreationTable/> : null;

        return (
            <div>
                <h3>Steps</h3>
                <ul>
                    {this.props.currentSteps.map((step, i) => {
                        var values = step.values ? [
                            ...step.values
                        ] : null;
                        return (
                            <li key={i}>{step.step.pattern.replace(/"<String>"|<Number>/g, function() { return values.shift(); })}</li>
                        )
                    }
                    )}
                </ul>
                <div className='form-group'>
                    <Autosuggest
                        ref='stepInput'
                        suggestions={(input, callback) => callback(null, this.props.steps.filter(step => step.pattern.includes(input)))}
                        suggestionRenderer={(suggestion, input) => (
                            <a>{suggestion.pattern}</a>
                        )}
                        suggestionValue={suggestion => suggestion.pattern}
                        inputAttributes={{
                            onKeyPress: event => this.handleKeyDown(event),
                            placeholder: 'Step',
                            className: 'form-control'
                        }}
                        theme={{
                            root: 'dropdown open',
                            suggestions: 'dropdown-menu',
                            suggestionIsFocused: 'dropdown-menu__item--focused',
                        }}
                    />
                </div>
                <div className='form-group'>
                    {valuesCreationTableToggler}
                    {valuesCreationTable}
                </div>
            </div>
        );
    }

    handleKeyDown(e) {
        var value = this.refs.stepInput.state.value.trim();

        if (e.nativeEvent.keyCode === 13 && value !== '' && !value.includes('"<String>"') && !value.includes('<Number>')) { // Enter
            this.saveStep(value);
            this.refs.stepInput.setState({
                ...this.refs.stepInput.state,
                value: ''
            });
        }
    }

    saveStep(step) {
        this.props.onStepSave(step);
    }

    showValuesCreationTable() {
        this.setState({
            ...this.state,
            valuesCreationTableVisible: !this.state.valuesCreationTableVisible
        });
    }
}
