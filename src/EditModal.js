import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField/TextField';
import Icon from '@material-ui/core/Icon/Icon';
import fetchJsonp from "fetch-jsonp";

const styles = theme => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
});

class EditModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal_open: false,
            classes: this.props,
            note_id: this.props.note_id,
            title: this.props.title,
            text: this.props.text,
            token: this.props.token
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeTitleNote = this.handleChangeTitleNote.bind(this);
        this.handleChangeTextNote = this.handleChangeTextNote.bind(this);
    }

    handleOpen = () => {
        this.setState({ modal_open: true });
    };

    handleClose = () => {
        this.setState({ modal_open: false });
        this.props.updateNotes();
    };

    handleChangeTitleNote(event) {
        this.setState({title: event.target.value});
    }

    handleChangeTextNote(event) {
        this.setState({text: event.target.value});
    }

    handleSubmit(event) {
        fetchJsonp(
            `https://api.vk.com/method/notes.edit?note_id=${this.state.note_id}&title=${this.state.title}&text=${this.state.text}&access_token=${this.state.token}&v=5.85`
        )
            .then(data => data.json())
            .then((response) => {
                this.handleClose();
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });

        event.preventDefault();
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Button size="small" className={classes.button} onClick={this.handleOpen}>
                    <EditIcon />
                </Button>
                <Modal
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                    open={this.state.modal_open}
                    onClose={this.handleClose}
                >
                    <div className={classes.paper}>
                        <form className={classes.container} noValidate autoComplete="off" onSubmit={this.handleSubmit}>
                            <TextField
                                id="standard-search"
                                label="Название заметки"
                                type="search"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChangeTitleNote}
                                value={this.state.title}
                            />
                            <TextField
                                id="standard-search"
                                label="Текст заметки"
                                type="search"
                                className={classes.textField}
                                margin="normal"
                                onChange={this.handleChangeTextNote}
                                value={this.state.text}
                            />
                            <div className={classes.div}>
                                <Button variant="contained"  className={classes.button} color="primary" onClick={this.handleSubmit}>
                                    <Icon className={classes.rightIcon}>send</Icon>
                                </Button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </React.Fragment>
        );
    }
}

EditModal.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EditModal);