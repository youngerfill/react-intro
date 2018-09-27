import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props)
{
    return (
          <button className="square" onClick={props.onClick}>
            {props.value}
          </button>
        );
}

class Board extends React.Component
{
    renderSquare(i)
    {
        return (
            <Square
                value={ this.props.squares[i] }
                onClick={() => this.props.onClick(i)}
            />
        );
    }

    createBoard()
    {
        let board = []
        for (let rowNumber=0; rowNumber<3; rowNumber++)
        {
            let row = []
            for (let columnNumber=0; columnNumber<3; columnNumber++)
            {
                row.push(
                    <Square
                        key={rowNumber*3+columnNumber}
                        value={ this.props.squares[rowNumber*3+columnNumber] }
                        onClick={() => this.props.onClick(rowNumber*3+columnNumber)}
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

    render()
    {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        const moves = history.map((step, move) =>
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
        });

        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
            />
            </div>
            <div className="game-info">
            <div>{ status }</div>
            <ol>{ moves }</ol>
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
            return squares[a];
        }
    }
    return null;
}
