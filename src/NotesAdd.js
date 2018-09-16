import React, { Component } from 'react';
import fetchJsonp from "fetch-jsonp";

class NotesAdd extends Component {
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
        this.setState({text: '<div className="wikiText"><!--4-->' + this.state.text + ' </div>'});
        fetchJsonp(
            `https://api.vk.com/method/notes.add?title=${this.state.title}&text=${this.state.text}&access_token=${this.state.token}&v=5.85`
        )
            .then(data => data.json())
            .then(({response}) => {
                // this.setState({notes: response.items, notesLoaded: true});
                // this.setState({notes: });
                fetchJsonp(
                    `https://api.vk.com/method/notes.getById?note_id=${response}&access_token=${this.state.token}&v=5.85`
                )
                    .then(data => data.json())
                    .then(({response}) =>{
                        // console.log(response);
                        this.props.addNote(response);
                    })
                    .catch(ex => {
                        console.log("parsing failed", ex);
                    });
                // console.log(response);
                // this.props.addNote({id: response, title: this.state.title, text: this.state.text});
                // console.log(response);
            })
            .catch(ex => {
                console.log("parsing failed", ex);
            });

        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <p>Название новой заметки</p>
                        <input onChange={this.handleChangeTitleNote}/>
                        <p>Текст новой заметки</p>
                        <input onChange={this.handleChangeTextNote}/>
                    </label>
                    <input type="submit" value="submit"/>
                </form>
                {/*<a*/}
                    {/*className="button"*/}
                    {/*href={`https://api.vk.com/method/notes.add?title=${}&text=${}&access_token=${this.state.token}&v=5.85`}*/}
                {/*>*/}
                    {/*Получить токен*/}
                {/*</a>*/}
            </div>
        );
    }
}

export default NotesAdd;