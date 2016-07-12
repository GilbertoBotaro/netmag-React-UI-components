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
    <Poti min={1}
          max={7}
          step={.5}
          defaultValue={3}
          name='example-1'> Example 1 </Poti>
  </div>
)

export default App
