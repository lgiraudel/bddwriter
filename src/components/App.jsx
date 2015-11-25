const React = require('react');
const Features = require('./Features.jsx');

const App = React.createClass({
    getInitialState: function () {
        return {
            currentPage: 'features'
        };
    },

    render: function () {
        const page = <Features source="/features"></Features>;

        return (
            <div className="container-fluid">
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">BDD Writer</a>
                        <ul className="nav navbar-nav">
                            <li><a href="#">Features</a></li>
                            <li><a href="#">Import/Export</a></li>
                        </ul>
                    </div>
                </nav>
                {page}
            </div>
        );
    }
});

module.exports = App;