/**
 * @module app
 * @author Gregor Adams <greg@pixelass.com>
 */

import React from 'react'
import Poti from './components/potentiometer'

/**
 * a simple App that connects to a Store
 * the App is called with a `state` and an `updtate` function
 * @param  {Object} state - the app state
 * @return {HTMLElement} returns a rendered React component
 */
const App = () => (
  <div className='example-app'>
    <Poti> Example 1 </Poti>
  </div>
)

export default App
