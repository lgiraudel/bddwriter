const React = require('react');
const FeatureForm = require('./FeatureForm.jsx');

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

    render: function () {
        const features = this.state.features.map(function (feature) {
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
                    </div>
                </div>
            );
        }.bind(this));

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
                            {features}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Features;