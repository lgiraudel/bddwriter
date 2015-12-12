import React, { Component } from 'react';
import { removeFeature } from '../actions/actions';
import slug from 'slug';

export default class Feature extends Component {
    render() {
        return (
            <div className='panel panel-default'>
                <div className='panel-heading'>
                    <div className='row'>
                        <a data-toggle='collapse' data-parent='#features-accordion' href={'#' + this.props._id}>
                            <h4 className='panel-title col-sm-8'>
                                Feature: {this.props.title} <span className='badge'>{this.props.scenarios.length} scenario{this.props.scenarios.length > 1 ? 's' : ''}</span>
                            </h4>
                        </a>
                        <div className='text-right col-sm-4'>
                            <a className='glyphicon glyphicon-remove' onClick={this.props.onRemoveClick}></a>
                        </div>
                    </div>
                </div>
                <div id={this.props._id} className='panel-collapse collapse'>
                    <div className='panel-body'>
                        {this.props.description}

                        {this.props.scenarios.map(scenario =>
                            <div className='panel panel-default' key={scenario._id}>
                                <div className='panel-heading'>Scenario: {scenario.title}</div>
                                <div className='panel-body'>
                                    {scenario.description}
                                    <ul>
                                        {scenario.steps.map((step, i) => {
                                            const stepWithValues = step.step.pattern.replace(/"<String>"|<Number>/, step.values);

                                            return (
                                                <li key={slug(stepWithValues)}>{stepWithValues}</li>
                                            )
                                        }
                                        )}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}
