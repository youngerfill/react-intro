import * as h from 'react-hyperscript-helpers'

import * as helpers from '../helpers.js'

import { Board } from './board.js'
import { History } from './history.js'

const Screen = ({state}) =>
{
    const history = state.history;
    const current = history[state.stepNumber];
    const winner = helpers.calculateWinner(current.squares);

    const draw = ( (!winner) && (history.length===10) )

    let status

    if (draw)
    {
        status = 'The game is a draw'
    }
    else
        if (winner)
        {
            status = 'Winner: ' + winner[0];
        }
        else
        {
            status = 'Next player: ' + (state.xIsNext ? 'X' : 'O');
        }

    return h.div(
            ".game",
            [
                h.div(
                    ".game-board",
                    [
                        h.h(
                            Board,
                            {
                                winner: winner,
                                squares: current.squares,
                                handleSquareClicked: (i) => { helpers.handleSquareClicked(state, i) }
                            }
                        )
                    ]
                ),
                h.div(
                    ".game-info",
                    [
                        h.div({key: "status"}, status),
                        [
                            History({history: history, reverse: state.reverse, stepNumber: state.stepNumber})
                        ]
                    ]
                ),
                h.div(
                    ".game-controls",
                    [
                        h.div(
                        [
                            h.label(
                            [
                                h.input(
                                    "#reverse",
                                    {
                                        onChange: (e) =>
                                            Object.assign(
                                                state,
                                                { reverse: e.target.checked }
                                            ),
                                        type: "checkbox",
                                        name: "reverse"
                                    }
                                ),
                                "Reverse history"
                            ]
                            )
                        ]
                        )
                    ]
                )
            ]
        )
}

export {Screen}
