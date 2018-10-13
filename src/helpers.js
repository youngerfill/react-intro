
const handleSquareClicked = (state, squareIndex) =>
{
//    return

    console.log("MARK 10")
    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[squareIndex])
    {
        return;
    }
    squares[squareIndex] = state.xIsNext ? 'X' : 'O';

    console.log("MARK 20")
    // JS function to update part of object?
    //      --> Object.assign() (or spread operator)
    console.log("state == " + JSON.stringify(state))
    state = Object.assign(
        state,
        {
            history: history.concat(
                [
                    {
                        squares: squares,
                        column: squareIndex%3,
                        row: Math.floor(squareIndex/3),
                    }
                ]
            ),
            stepNumber: history.length,
            xIsNext: !state.xIsNext,
        }
    )
    console.log("state == " + JSON.stringify(state))
    console.log("MARK 30")
}

const jumpToStep = (state, step) =>
{
    state = Object.assign(
        state,
        {
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        }
    )
}

const calculateWinner = (squares) =>
{
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

export { handleSquareClicked, jumpToStep, calculateWinner }
