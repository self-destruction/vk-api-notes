import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import AddNote from './AddNote';
import EditModal from './EditModal';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline/CssBaseline';
import DeleteIcon from '@material-ui/icons/Delete';

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;
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
    card: {
        width: 400,
        textAlign: 'center',
        margin: theme.spacing.unit,
    },
    div: {
        alignItems: 'flex-start',
    },
    button: {
        margin: theme.spacing.unit,
    },
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            notesLoaded: false,
            clientId: 6694078,
            token: this.props.token,
            classes: this.props
        };
    }

    componentDidMount() {
        fetchJsonp(
            `https://api.vk.com/method/notes.get?access_token=${this.state.token}&v=5.85`
        )
            .then(data => data.json())
            .then(({response}) => {
                this.setState({notes: response.items, notesLoaded: true});
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });
    }

    handleDelete(id, e) {
        fetchJsonp(
            `https://api.vk.com/method/notes.delete?note_id=${id}&access_token=${this.state.token}&v=5.85`
        )
            .then(data => data.json())
            .then(({response}) => {
                this.componentDidMount();
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });
    }

    createMarkup() {
        return this.state.notes.map(note => {
            let htmlObject = document.createElement('div');
            htmlObject.innerHTML = note.text;

            let note_text = htmlObject.getElementsByClassName('wikiText')[0].innerText;
            note_text = note_text.substring(0, note_text.length - 1);

            return (
                <Paper className={this.state.classes.paper}>
                    <CardContent>
                        <Typography gutterBottom variant="headline" component="h2">
                            <div className={note.id + 'title'}>{note.title}</div>
                        </Typography>
                        <Typography component="p">
                            <div className={note.id + 'text'}>{note_text}</div>
                        </Typography>
                    </CardContent>
                    <div className={this.state.classes.div}>
                        <Button size="small" className={this.state.classes.button} onClick={(e) => this.handleDelete(note.id, e)}>
                            <DeleteIcon />
                        </Button>
                        <EditModal classes={this.state.classes} note_id={note.id} title={note.title} text={note_text} token={this.state.token} updateNotes={this.updateNotes}/>
                    </div>
                </Paper>
            );
        });
    }

    updateNotes = () => {
        this.componentDidMount();
    };

    render() {
        const {classes} = this.state.classes;
        if (this.state.notesLoaded) {
            return (
                <React.Fragment>
                    <CssBaseline />
                    <main className={classes.layout}>
                        <AddNote token={this.state.token} updateNotes={this.updateNotes}/>
                        <Card className={classes.card}>
                            {this.createMarkup()}
                        </Card>
                    </main>
                </React.Fragment>
            );
        } else {
            return (
                <div className="app-loader">
                    {" "}
                    <ClipLoader
                        className={override}
                        sizeUnit={"px"}
                        size={150}
                        color={"#123abc"}
                        loading={this.state.loading}
                    />
                </div>
            );
        }
    }
}

Main.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);