/* global document */

import React from 'react'
import ReactDOM from 'react-dom'
import Store from './services/store'
import App from './app'


const mountPoint = document.getElementById('app')
ReactDOM.render(<Store connect={App}/>, mountPoint)
