const React = require('react');
const FeatureForm = require('./FeatureForm.jsx');
const slug = require('slug');

const Features = React.createClass({
    getInitialState: function () {
        return {
            features: []
        };
    },

    componentDidMount: function () {
        $.ajax({
            url: this.props.source,
            dataType: 'json'
        }).done(function (res) {
            if (this.isMounted()) {
                this.setState({
                    features: res
                })
            }
        }.bind(this));
    },

    onFeatureCreated: function (feature) {
        this.setState({
            features: this.state.features.concat(feature)
        });
    },

    removeFeature: function (featureToDelete, e) {
        e.preventDefault();

        $.ajax({
            url: this.props.source,
            method: 'delete',
            dataType: 'json',
            data: {
                _id: featureToDelete._id
            }
        }).done(function (res) {
            if (res.success) {
                this.setState({
                    features: this.state.features.filter(feature => feature._id != featureToDelete._id)
                });
            }
        }.bind(this));
    },

    renderScenarios: function (feature) {
        return feature.scenarios.map(function (scenario) {
            return (
                <div className="panel panel-default" key={slug(scenario.title)}>
                    <div className="panel-heading">{scenario.title}</div>
                    <div className="panel-body">{scenario.description}</div>
                </div>
            )
        });
    },

    renderFeatures: function () {
        return this.state.features.map(function (feature) {
            const scenarios = this.renderScenarios(feature);

            return (
                <div key={feature._id} className="panel panel-default">
                    <div className="panel-heading">
                        <div className="row">
                            <div className="col-sm-8">
                                Feature: {feature.title}
                            </div>
                            <div className="text-right col-sm-4">
                                <a className="glyphicon glyphicon-remove" href="#" onClick={this.removeFeature.bind(this, feature)}></a>
                            </div>
                        </div>
                    </div>
                    <div className="panel-body">
                        {feature.description}

                        <h2>Scenarios</h2>
                        {scenarios}
                    </div>
                </div>
            );
        }.bind(this));
    },

    render: function () {
        return (
            <div className="panel panel-defautl">
                <div className="panel-body">
                    <div className="panel panel-default col-sm-6">
                        <div className="panel-body">
                            <FeatureForm source={this.props.source} onFeatureCreated={this.onFeatureCreated}/>
                        </div>
                    </div>
                    <div className="panel panel-default col-sm-6">
                        <div className="panel-body">
                            {this.renderFeatures()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Features;