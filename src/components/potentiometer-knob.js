/**
 * @module potentiometer-knob
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'

/**
 * static styles for the component
 * @type {Object}
 */
const staticStyles = {
  knob: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    height: '1em',
    width: '1em',
    transform: 'translate(-50%,-50%)',
    borderRadius: '50%',
    borderStyle: 'solid'
  },
  indicator: {
    height: '50%',
    width: 2,
    position: 'absolute',
    bottom: 0,
    left: '50%',
    marginLeft: -1,
    backgroundColor: 'currentColor'
  }
}

/**
 * renders a knob that is rotated by an angle
 * @param  {Object} props - the component props
 * @property {Number} props.rotation - the knob will be rotatied by this value
 * @return {HTMLElement} returns a rendered React component
 */
const Knob = (props) => {
  return (<div className='knob' style={staticStyles.knob}>
            {props.rotation}
            <div className='indicator' style={staticStyles.indicator}/>
          </div>
  )
}

Knob.propTypes = {
  rotation: PropTypes.number
}

export default Knob
