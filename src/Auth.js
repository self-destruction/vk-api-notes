import React, { Component } from 'react';

class Auth extends Component {
    redirectUri = 'http://localhost:3000';

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: "",
            clientId: 6694078
        };
    }

    componentDidMount() {
        const hash = window.location.hash;
        if (hash) {
            const token = hash
                .slice(1)
                .split("&")
                .filter(params => params.indexOf("access_token=") !== -1)[0]
                .split("=")[1];
            this.props.setToken(token);
            this.setState({token, loaded: true});
        }
    }

    render() {
        const {loaded, clientId} = this.state;
        const {children} = this.props;
        if (!loaded) {
            return (
                <div>
                    <a
                        className="button"
                        href={
                            `https://oauth.vk.com/authorize?client_id=${clientId}&
                            display=page&redirect_uri=${this.redirectUri}&scope=notes&response_type=token&v=5.85`}
                    >
                        Получить токен
                    </a>
                </div>
            );
        } else {
            return children;
        }
    }
}

export default Auth;