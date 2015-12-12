import React, { Component } from 'react';
import Feature from './Feature.jsx';
import { Link } from 'react-router';

export default class FeatureList extends Component {
    render() {
        return (
            <div>
                <Link to="/feature/new" className='btn btn-primary add-feature-button'><span className="glyphicon glyphicon-plus" aria-hidden="true"></span> Create new feature</Link>
                <div className='panel-group' id='features-accordion'>
                    {this.props.features.map((feature, index) =>
                        <Feature {...feature} key={feature._id} onRemoveClick={() => this.props.onRemoveClick(feature._id)} />
                    )}
                </div>
            </div>
        )
    }
}
