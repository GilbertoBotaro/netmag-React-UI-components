/**
 * @module potentiometer-knob
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'


/**
 * renders a knob that is rotated by an angle
 * @return {HTMLElement} returns a rendered React component
 */
const Knob = (props) => (
  <div className='knob'>
    <div className='indicator'>
      {props.rotation} </div>
  </div>
)

Knob.propTypes = {
  rotation: PropTypes.number
}

export default Knob
