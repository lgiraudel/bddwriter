import React, { Component } from 'react';
import { connect } from 'react-redux';
import FeatureList from '../components/FeatureList.jsx';
import { fetchFeatures, fetchSteps, removeFeature } from '../actions/actions';

class FeaturesPage extends Component {
    componentDidMount() {
        const { dispatch } = this.props;
        dispatch(fetchFeatures());
        dispatch(fetchSteps());
    }

    render() {
        const { dispatch } = this.props;

        return (
            <div>
                <FeatureList features={this.props.features} onRemoveClick={_id => dispatch(removeFeature(_id))}/>
            </div>
        )
    }
}

function select(state) {
    return {
        features: state.features
    }
}

export default connect(select)(FeaturesPage);
