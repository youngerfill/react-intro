import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)
{
    let className="square"

    if (props.winningSquare)
        className += " highlight"
    return (
          <button className={className} onClick={props.onClick}>
            {props.value}
          </button>
        );
}

class Board extends React.Component
{
    createBoard()
    {
        let board = []
        for (let rowNumber=0; rowNumber<3; rowNumber++)
        {
            let row = []
            for (let columnNumber=0; columnNumber<3; columnNumber++)
            {
                const squareIndex= rowNumber*3+columnNumber
                const winningSquare = ( this.props.winner && this.props.winner[1].includes(squareIndex) )
                row.push(
                    <Square
                        key={squareIndex}
                        winningSquare = {winningSquare}
                        value={ this.props.squares[squareIndex] }
                        onClick={() => this.props.onClick(squareIndex)}
                    />
                )
            }
            board.push(<div key={rowNumber} className="board-row">{row}</div>)
        }
        return board
    }

    render()
    {
        return (
            <div>{this.createBoard()}</div>
        );
    }
}

class Game extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            stepNumber: 0,
            xIsNext: true,
            reverse: false,
        };
    }

    handleClick(i)
    {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
            squares: squares,
            column: i%3,
            row: Math.floor(i/3),
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step)
    {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    renderHistoryButton(step, move)
    {
            const textWeight = (this.state.stepNumber === move) ? 'boldText' : 'normalText';

            const description = move ?
                'Go to move #' + move :
                'Go to game start';

            const location = (step.column !== undefined) ?
                ' (row=' + (step.row + 1)  + ', col=' + (step.column + 1) + ', value=' + step.squares[step.column + step.row*3] + ')' :
                '';

            return (
                <li key={move}>
                <button onClick={() => this.jumpTo(move)} className={textWeight}>{description}{location}</button>
                </li>
            );
    }

    renderHistory(history, reverse)
    {
        if (reverse)
            return <ol reversed>{history.slice(0).reverse().map((step,move) =>  { return this.renderHistoryButton(step, history.length - 1 - move) } )}</ol>
        else
            return <ol>{history.map((step,move) =>  { return this.renderHistoryButton(step, move) } )}</ol>
    }

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        let status;
        if (winner) {
            status = 'Winner: ' + winner[0];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winner={winner}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{ status }</div>
                    { this.renderHistory(history, this.state.reverse) }
                </div>
                <div className="game-controls">
                    <div>
                        <label><input onChange={ (e) => this.setState({ reverse: e.target.checked }) } type="checkbox" id="reverse" name="reverse"/>Reverse history</label>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render (
    <Game />,
    document.getElementById('root')
);

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [ squares[a], lines[i] ];
        }
    }
    return null;
}
