const React = require('react');

const FeatureForm = React.createClass({
    save: function (e) {
        e.preventDefault();

        const title = this.refs.title.getDOMNode().value;
        const description = this.refs.description.getDOMNode().value;

        $.ajax({
            url: this.props.source,
            method: 'post',
            data: {
                title: title,
                description: description
            }
        }).done(res => this.props.onFeatureCreated(res));
    },

    render: function () {
        return (
            <form onSubmit={this.save}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" id="title" className="form-control" ref="title"></input>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea className="form-control" id="description" ref="description"></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Save</button>
            </form>
        );
    }
});

module.exports = FeatureForm;