import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
    render() {
        return (
            <div className='container-fluid'>
                <div className='navbar navbar-default navbar-fixed-top'>
                    <div className='container-fluid'>
                        <span className='navbar-brand'>BDD Writer</span>
                        <ul className='nav navbar-nav'>
                            <li><Link to='/features'>Features</Link></li>
                            <li><Link to='import'>Import/Export</Link></li>
                        </ul>
                    </div>
                </div>
                <div>
                    {this.props.children}
                </div>
                <footer className='footer text-center'>
                    <p>Created by Purch Grenoble Team</p>
                    <img src='/last-deploy'></img>
                </footer>
            </div>
        )
    }
}

export default App;
