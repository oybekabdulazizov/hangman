import React, { Component } from 'react';
import { img0, img1, img2, img3, img4, img5, img6 } from './images';

class Hangman extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nWrongGuesses: 0, 
            guessed: new Set(), 
            answer: "react"
        }
        this.handleGuess = this.handleGuess.bind(this);
        this.restart = this.restart.bind(this);
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

    restart() {
        this.setState(currState => ({
            nWrongGuesses: 0, 
            guessed: new Set()
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
        const gameOver = this.state.nWrongGuesses >= this.props.maxWrong;
        const isWin = this.guessedWord().join("") === this.state.answer;
        let gameState = this.generateButtons();
        if (isWin) gameState = "You won! Hooray!";
        if (gameOver) gameState = "You lost! Booo!";
        return (
            <div className='Hangman'>
                <h1>Hangman</h1>
                <img src={this.props.images[this.state.nWrongGuesses]} />
                <p>Wrong letters guessed: {this.state.nWrongGuesses}</p>
                <p>{!gameOver ? this.guessedWord() : this.state.answer}</p>
                <p>{gameState}</p>
                <button onClick={this.restart}>Restart</button>
            </div>
        )
    }
}

export default Hangman; 