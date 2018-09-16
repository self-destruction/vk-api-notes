import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';
import NotesAdd from "./NotesAdd";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notes: [],
            notesLoaded: false,
            clientId: 6694078,
            token: this.props.token
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
            return (
                <div>
                    <div dangerouslySetInnerHTML={{__html: note.text}}/>
                    <div>{note.title}</div>
                    <button onClick={(e) => this.handleDelete(note.id, e)}>delete</button>
                </div>
            );
        });
    }

    addNote = note => {
        this.componentDidMount();
    };

    render() {
        if (this.state.notesLoaded) {
            return (
                <div>
                    {this.createMarkup()}
                    <NotesAdd token={this.state.token} addNote={this.addNote}/>
                </div>
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

export default Main;