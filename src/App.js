import React, { Component } from 'react';
import Auth from './Auth';
import Main from './Main';
import logo from './logo.svg';
import './App.css';

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
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Заметки ВК</h1>
                </header>
                <Auth setToken={this.setToken}>
                    <Main token={this.state.token}/>
                </Auth>
            </div>
        );
    }
}

export default App;
