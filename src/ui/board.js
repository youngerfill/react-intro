import * as h from 'react-hyperscript-helpers'

const Square = ({squareIndex, winningSquare, value, onClick}) =>
{
    let selector=".square"

    if (winningSquare)
        selector+= ".highlight"
    return h.button(selector, { key: squareIndex, onClick: onClick }, value)
}

const Board = ({winner, squares, handleSquareClicked}) =>
{
        let board = []
        for (let rowNumber=0; rowNumber<3; rowNumber++)
        {
            let row = []
            for (let columnNumber=0; columnNumber<3; columnNumber++)
            {
                const squareIndex= rowNumber*3+columnNumber
                const winningSquare = ( winner && winner[1].includes(squareIndex) )
                row.push(
                    h.h(Square,
                        {
                            squareIndex: squareIndex,
                            winningSquare: winningSquare,
                            value: squares[squareIndex],
                            onClick: () => { handleSquareClicked(squareIndex) }
//                            onClick: {() => onClick(squareIndex)}
                        }
                    )
                )
            }
            board.push( h.div(".board-row", {key: rowNumber}, row) )
        }
        return h.div(board)
}

export { Board }
