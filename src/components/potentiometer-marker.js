/**
 * @module potentiometer-marker
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'

/**
 * absolute center styles
 * @type {Object}
 */
const absoluteCenter = {
  position: 'absolute',
  top: '50%',
  left: '50%'
}


/**
 * renders a marker that is rotated by an angle and contains an
 * optional label
 * @param  {Object} props - the component props
 * @param {Number} props.fullAngle - the full angle to distribute in
 * @param {Number} props.radius - the radius of the distribution
 * @param {Number} props.steps - number of steps
 * @param {Number} props.rest -
 *        half of the difference between `fullAngle` and 360
 * @param {Number} props.index - index of marker in list
 * @param {Boolean} props.selected -
 *        true if the marker is for the current value
 * @param {Number|String|HTMLElement} [props.label] -
 *        an optional label
 * @return {HTMLElement} returns a rendered React component
 */
const Marker = (props) => {
  const {label, selected, fullAngle, rest, index, steps} = props
  const baseAngle = fullAngle / steps
  const maybeSelected = {
    color: (selected ? 'red' : 'black')
  }
  const rotation = Object.assign({
    transform: `rotate(${baseAngle * index + rest}deg) translateY(30px)`
  }, absoluteCenter)
  const revRotation = Object.assign({
    transform: `translate(-50%,-50%) rotate(${(baseAngle * index + rest) * -1}deg)`
  }, absoluteCenter)
  return (
    <div className='marker' style={rotation}>
      <div style={revRotation}>
        <div className='marker-inner' style={maybeSelected}>
          {label}
        </div>
      </div>
    </div>
  )
}

Marker.propTypes = {
  selected: PropTypes.bool,
  fullAngle: PropTypes.number,
  rest: PropTypes.number,
  index: PropTypes.number,
  steps: PropTypes.number,
  label: PropTypes.node
}

export default Marker
