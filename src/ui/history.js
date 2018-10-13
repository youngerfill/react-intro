import * as h from 'react-hyperscript-helpers'
import * as helpers from '../helpers.js'

const HistoryButton = ({step, move, stepNumber}) =>
{
    const textWeight = (stepNumber === move) ? '.boldText' : '.normalText';

    const description = move ?
        'Go to move #' + move :
        'Go to game start';

    const location = (step.column !== undefined) ?
        ' (row=' + (step.row + 1)  + ', col=' + (step.column + 1) + ', value=' + step.squares[step.column + step.row*3] + ')' :
        '';

    return h.li(
            {key: move},
            [
                h.button(
                    textWeight,
                    { onClick: () => helpers.jumpToStep(move) },
                    description + location
                )
            ]
        )
}

const History = ({history, reverse, stepNumber}) =>
{
    if (reverse)
        return h.ol(
            { key: "history", reversed: '' },
            history.slice(0).reverse().map(
                (step,move) =>
                {
                    return HistoryButton({step:step, move:history.length - 1 - move, stepNumber:stepNumber})
                }
            )
        )
    else
        return h.ol(
            { key: "history" },
            history.map(
                (step,move) =>
                {
                    return HistoryButton({step:step, move:move, stepNumber:stepNumber})
                }
            )
        )
}

export { History }

