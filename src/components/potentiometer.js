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
 * @param {Node} [props.min=0] -
 *        min value
 * @param {Node} [props.max=100] -
 *        max value
 * @param {Node} [props.step=1] -
 *        step value
 * @param {Node} props.name -
 *        name attribute (for forms)
 * @param {Node} [props.defaultValue=50] -
 *        default value
 * @param {Node} props.children -
 *        one or more nested element(s) usually used to show
 *        a label text
 */
const Poti = (props) => (
  <label className='poti'>
    {props.children}
    <input type='range'
           min={props.min}
           max={props.max}
           step={props.step}
           name={props.name}
           defaultValue={props.defaultValue}/> </label>
)

Poti.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  defaultValue: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
}

Poti.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  defaultValue: 50
}

export default Poti
