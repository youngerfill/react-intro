import * as h from 'react-hyperscript-helpers'
import ReactDOM from 'react-dom';
import './index.css';

import {Screen} from './ui/screen.js'
import {state} from './state.js'

ReactDOM.render (
    h.h(Screen, {state}),
    document.getElementById('root')
);

