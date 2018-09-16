import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';
import { css } from 'react-emotion';
import { ClipLoader } from 'react-spinners';

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

    createMarkup() {
        return this.state.notes.map(note => {
            return (
                <div dangerouslySetInnerHTML={{__html: note.text}}/>
            );
        });
    }

    render() {
        let notes = this.state.notes.map(note => {
            return note.text;
        });
        console.log(notes);
        if (this.state.notesLoaded) {
            return (
                <div>{this.createMarkup()}</div>
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