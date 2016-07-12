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
const App = (state, update) => {

  /**
   * a simple change handler. Calls an update function to set the state
   * in the Store
   * @param  {Event} e - the change event
   * @return {HTMLElement} returns a rendered React component
   */
  const handleChange = (e) => {
    update({value:e.target.value})
  }

  return (
    <div className='example-app'>
      <Poti min={1}
            max={7}
            step={.5}
            value={state.value || 5}
            onChange={handleChange}
            name='example-1'> Example 1 </Poti>
    </div>
  )
}

export default App
