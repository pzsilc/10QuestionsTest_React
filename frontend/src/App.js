import React, { Component } from 'react';
import axios from 'axios';
const backendUrl = 'http://localhost/ankieta.v128/backend';


export default class App extends Component{

    state = {
        questions: [],
        answers: {},
        error: null
    }

    componentDidMount = () => {
        axios.get(backendUrl + `/api/questions`)
        .then(res => res.data)
        .then(res => this.setState({ questions: res.data }))
        .catch(err => this.setState({ errors: err.response }));
    }

    onChange = e => {
        const { name, value } = e.target;
        this.setState({
            ...this.state,
            answers: {
                ...this.state.answers,
                [name]: value
            }
        })
    }

    onSubmit = e => {
        e.preventDefault();
    }

    render = () => {
        return(
            <div>
                {this.state.error && 
                    <div className="btn btn-danger">
                        <i className="fa fa-info mr-3"></i>{this.state.error}
                    </div>
                }
                {!this.state.error && 
                    <form onSubmit={this.onSubmit}>
                        {this.state.questions.map((question, key) => 
                            <div key={key}>
                                <h3>{key + 1}. {question.text}</h3>
                                <label>
                                    <input value="1" type="radio" onChange={this.onChange} name={'q_' + question.id} required/>
                                    Zdecydowanie tak
                                </label>
                                <label>
                                    <input value="2" type="radio" onChange={this.onChange} name={'q_' + question.id} required/>
                                    Raczej tak
                                </label>
                                <label>
                                    <input value="3" type="radio" onChange={this.onChange} name={'q_' + question.id} required/>
                                    Raczej nie
                                </label>
                                <label>
                                    <input value="4" type="radio" onChange={this.onChange} name={'q_' + question.id} required/>
                                    Zdecydowanie nie
                                </label>
                            </div>
                        )}
                        <input type="submit" className="btn btn-primary"/>
                    </form>
                }
            </div>
        )
    }

}
