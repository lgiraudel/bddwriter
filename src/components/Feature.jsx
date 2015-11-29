import React, { Component } from 'react';
import { removeFeature } from '../actions/actions';
import slug from 'slug';

export default class Feature extends Component {
    render() {
        return (
            <div key={this.props._id} className='panel panel-default'>
                <div className='panel-heading'>
                    <div className='row'>
                        <div className='col-sm-8'>Feature: {this.props.title}</div>
                        <div className='text-right col-sm-4'>
                            <a className='glyphicon glyphicon-remove' onClick={this.props.onRemoveClick}></a>
                        </div>
                    </div>
                </div>
                <div className='panel-body'>
                    {this.props.description}

                    {this.props.scenarios.map(scenario =>
                        <div className='panel panel-default' key={scenario._id}>
                            <div className='panel-heading'>Scenario: {scenario.title}</div>
                            <div className='panel-body'>
                                {scenario.description}
                                <ul>
                                    {scenario.steps.map(step =>
                                        <li key={slug(step)}>{step}</li>
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
