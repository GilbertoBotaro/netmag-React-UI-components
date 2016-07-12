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
  const handleChange = (key, e) => {
    update({
      [key]: e.target.value
    })
  }

  return (
    <div className='example-app'>
      <Poti min={-1}
            max={1}
            step={.5}
            value={Number(state['example-1']) || 0}
            onChange={handleChange.bind(this, 'example-1')}
            name='example-1'>
      Example 1 </Poti>
      <Poti min={-1}
            max={1}
            step={.5}
            markers={['-1', '0', '1']}
            value={Number(state['example-2']) || 0}
            onChange={handleChange.bind(this, 'example-2')}
            name='example-2'> Example 2 </Poti>
    </div>
  )
}

export default App
