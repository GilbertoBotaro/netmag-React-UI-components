/**
 * @module app
 * @author Gregor Adams <greg@pixelass.com>
 */

import React from 'react'
import Poti from './components/potentiometer'

/**
 * helper to return the days of each month
 * @type {Object}
 */
const daysPerMonth = (leap) => ({
  1: 31,
  2: leap ? 29 : 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31
})

/**
 * a simple App that connects to a Store
 * the App is called with a `state` and an `updtate` function
 * @param  {Object} state - the app state
 * @param  {Function} update - a function to update the state
 * @return {HTMLElement} returns a rendered React component
 */
const App = (state, update) => {
  /**
   * handle the change events of the component and
   * updates the global store
   * @param  {Event} e - the change event
   */
  const handleChange = (key, value) => {
    update({
      [key]: Number(value)
    })
  }

  const localState = {}
  if (typeof state.flatPoti3 !== 'undefined') {
    const leap = state.flatPoti4 === 2016 || state.flatPoti4 === 2020
    localState.flatPoti2Max = daysPerMonth(leap)[state.flatPoti3]
  }

  /* return the App */
  return (
    <div className='example-app'>
      <Poti className='default'
            min={0}
            step={1}
            max={10}
            value={typeof state.defaultPoti === 'number' ? state.defaultPoti : 5}
            onChange={handleChange.bind(this, 'defaultPoti')}>
        <div>
          Default
        </div>
      </Poti>
      <Poti className='digital'
            min={-1}
            max={1}
            step={.2}
            fullAngle={180}
            markers={['-1', '0', '1']}
            size={100}
            value={typeof state.digitalPoti === 'number' ? state.digitalPoti : 1}
            onChange={handleChange.bind(this, 'digitalPoti')}>
        <div>
          Frequency
        </div>
      </Poti>
      <Poti className='digital'
            min={1}
            max={7}
            step={1}
            fullAngle={180}
            markers={['lo', 'mid', 'hi']}
            size={150}
            value={typeof state.digitalPoti2 === 'number' ? state.digitalPoti2 : 1}
            onChange={handleChange.bind(this, 'digitalPoti2')}>
        <div>
          output
        </div>
      </Poti>
      <Poti className='digital'
            min={0}
            max={127}
            step={127 / 20}
            fullAngle={300}
            markers={['0', '127']}
            size={150}
            value={typeof state.digitalPoti3 === 'number' ? state.digitalPoti3 : 1}
            onChange={handleChange.bind(this, 'digitalPoti3')}>
        <div>
          Gain
        </div>
      </Poti>
      <div className='flat-double'>
        <h2>{typeof state.flatPoti2 === 'number' ? state.flatPoti2 : 1}. {typeof state.flatPoti3 === 'number' ? state.flatPoti3 : 1}. {typeof state.flatPoti4 === 'number' ? state.flatPoti4 : 2015}</h2>
        <Poti className='flat big'
              min={1}
              max={localState.flatPoti2Max || 31}
              step={1}
              fullAngle={360 - 360 / ((localState.flatPoti2Max) || 31)}
              size={250}
              value={typeof state.flatPoti2 === 'number' ? state.flatPoti2 : 1}
              onChange={handleChange.bind(this, 'flatPoti2')}>
        </Poti>
        <Poti className='flat'
              min={1}
              max={12}
              step={1}
              markers={['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec']}
              fullAngle={360 - 360 / 12}
              size={180}
              value={typeof state.flatPoti3 === 'number' ? state.flatPoti3 : 1}
              onChange={handleChange.bind(this, 'flatPoti3')}>
        </Poti>
        <Poti className='flat small'
              min={2015}
              max={2023}
              step={1}
              fullAngle={360 - 360 / 8}
              size={110}
              value={typeof state.flatPoti4 === 'number' ? state.flatPoti4 : 2015}
              onChange={handleChange.bind(this, 'flatPoti4')}>
        </Poti>
      </div>
    </div>
  )
}

export default App
