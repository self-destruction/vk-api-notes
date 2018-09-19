import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    layout: {
        width: 'auto',
        display: 'block', // Fix IE11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing.unit * 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    form: {
        marginTop: theme.spacing.unit * 2,
    },
});

class Auth extends Component {
    redirectUri = 'http://localhost:3000';

    constructor(props) {
        super(props);
        this.state = {
            loaded: false,
            token: "",
            clientId: 6694078,
            classes: this.props
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
        const {classes} = this.state.classes;
        if (!loaded) {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Avatar className={classes.avatar}>
                                <LockIcon />
                            </Avatar>
                            <Typography variant="headline">Авторизация</Typography>
                            <form className={classes.form}>
                                <Button
                                    fullWidth
                                    variant="raised"
                                    color="primary"
                                    className={classes.submit}
                                    href={`https://oauth.vk.com/authorize?client_id=${clientId}&display=page&redirect_uri=${this.redirectUri}&scope=notes&response_type=token&v=5.85`}
                                >
                                    Получить токен
                                </Button>
                            </form>
                        </Paper>
                    </main>
                </React.Fragment>
            );
        } else {
            return children;
        }
    }
}

Auth.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Auth);