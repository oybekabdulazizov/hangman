import React, { Component } from 'react';
import img0 from './images/0.jpg';
import img1 from './images/1.jpg';
import img2 from './images/2.jpg';
import img3 from './images/3.jpg';
import img4 from './images/4.jpg';
import img5 from './images/5.jpg';
import img6 from './images/6.jpg';

class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nWrongGuesses: 0, 
            guessed: new Set(), 
            answer: "react"
        }
        this.handleGuess = this.handleGuess.bind(this);
    }

    static defaultProps = {
        maxWrong: 6, 
        images: [ img0, img1, img2, img3, img4, img5, img6 ]
    }

    guessedWord() {
        return this.state.answer
            .split("")
            .map((ltr) => this.state.guessed.has(ltr) ? ltr : "_");
    }

    handleGuess(e) {
        const ltr = e.target.value;
        this.setState(currState => ({
            guessed: currState.guessed.add(ltr),
            nWrongGuesses: currState.nWrongGuesses + (currState.answer.includes(ltr) ? 0 : 1)
        }));
    }

    generateButtons() {
        return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr, idx) => (
            <button
                key={idx} 
                value={ltr} 
                onClick={this.handleGuess} 
                disabled={this.state.guessed.has(ltr)}
            >
                {ltr}
            </button>
        ));
    }

    render() {
        return (
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrongGuesses]} />
                <p>Wrong letters guessed: {this.state.nWrongGuesses}</p>
                <p>{this.guessedWord()}</p>
                <p>{this.generateButtons()}</p>
            </div>
        )
    }
}

export default Hangman; 