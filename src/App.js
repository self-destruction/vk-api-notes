import React, { Component } from 'react';

import Auth from './Auth';
import Main from './Main';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: ""
        };
    }

    setToken = token => {
        this.setState({token});
    };

    render() {
        return (
            <Auth setToken={this.setToken}>
                <Main token={this.state.token}/>
            </Auth>
        );
    }
}

export default App;
