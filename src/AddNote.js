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
        // alignItems: 'center',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 400,
    },
    div: {
        width: '100%',
        height: '30%',
        // justifyContent: 'center',
        // alignItems: 'right',
        margin: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        // display: 'flex',
        textAlign: 'right',
        // justifyContent: 'flex-end',
    },
    button: {
        width: 80,
        textAlign: 'center',
    },
    rightIcon: {
        // marginLeft: theme.spacing.unit,
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
                        this.props.addNote(response);
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
                    id="standard-multiline-static"
                    label="Текст новой заметки"
                    multiline
                    rows="4"
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
{/*<div>*/}
    {/*<form onSubmit={this.handleSubmit}>*/}
        {/*<label>*/}
            {/*<p>Название новой заметки</p>*/}
            {/*<input onChange={this.handleChangeTitleNote}/>*/}
            {/*<p>Текст новой заметки</p>*/}
            {/*<input onChange={this.handleChangeTextNote}/>*/}
        {/*</label>*/}
        {/*<input type="submit" value="submit"/>*/}
    {/*</form>*/}
{/*</div>*/}

// export default AddNote;
AddNote.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddNote);