import React, { Component } from 'react';
import Feature from './Feature.jsx';

export default class FeatureList extends Component {
    render() {
        return (
            <div>
                {this.props.features.map((feature, index) =>
                    <Feature {...feature} key={feature._id} onRemoveClick={() => this.props.onRemoveClick(feature._id)} />
                )}
            </div>
        )
    }
}
