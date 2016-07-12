/**
 * Potentiometers are commonly used to control electrical devices such
 * as volume controls on audio equipment. (wikipedia)
 * @module potentiometer
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'

/**
 * a radial slider/knob UI component.
 * Based on an HTML `input[type="range"]` element
 * @param  {Object} props -
 *        a collection of props used to define the component
 * @param {Node} props.children -
 *        one or more nested element(s) usually used to show
 *        a label text
 */
const Poti = (props) => (
  <label className='poti'>
    {props.children}
    <input type='range'
           min={0}
           max={100}
           step={1}
           defaultValue={50}/> </label>
)

Poti.propTypes = {
  children: PropTypes.node
}

export default Poti
