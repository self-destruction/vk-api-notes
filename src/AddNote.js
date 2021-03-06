import React, { Component } from 'react';
import fetchJsonp from "fetch-jsonp";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Icon from '@material-ui/core/Icon';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    div: {
        width: '100%',
        height: '30%',
        margin: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        textAlign: 'right',
    },
    button: {
        width: 80,
        textAlign: 'center',
    },
});

class AddNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            token: this.props.token,
            title: "",
            text: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitleNote = this.handleChangeTitleNote.bind(this);
        this.handleChangeTextNote = this.handleChangeTextNote.bind(this);
    }

    handleChangeTitleNote(event) {
        this.setState({title: event.target.value});
    }

    handleChangeTextNote(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        fetchJsonp(
            `https://api.vk.com/method/notes.add?title=${this.state.title}&text=${this.state.text}&access_token=${this.state.token}&v=5.85`
        )
            .then(data => data.json())
            .then(({response}) => {
                fetchJsonp(
                    `https://api.vk.com/method/notes.getById?note_id=${response}&access_token=${this.state.token}&v=5.85`
                )
                    .then(data => data.json())
                    .then(({response}) =>{
                        this.props.updateNotes(response);
                    })
                    .catch(ex => {
                        console.log("parsing failed", ex);
                    });
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                <TextField
                    id="standard-search"
                    label="Название новой заметки"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChangeTitleNote}
                />
                <TextField
                    id="standard-search"
                    label="Текст новой заметки"
                    type="search"
                    className={classes.textField}
                    margin="normal"
                    onChange={this.handleChangeTextNote}
                />
                <div className={classes.div}>
                    <Button variant="contained"  className={classes.button} color="primary" onClick={this.handleSubmit}>
                        <Icon className={classes.rightIcon}>send</Icon>
                    </Button>
                </div>
            </form>
        );
    }
}

AddNote.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNote);