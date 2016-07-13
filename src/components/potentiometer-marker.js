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
 * renders a marker that is rotated by an angle and contains an optional label
 * @param  {Object} props - the component props
 * @property {Number} props.fullAngle - the full angle to distribute in
 * @property {Number} props.radius - the radius of the distribution
 * @property {Number} props.steps - number of steps
 * @property {Number} props.rest - half of the difference between `fullAngle` and 360
 * @property {Number} props.index - index of marker in list
 * @property {Boolean} props.selected - true if the marker is for the current value
 * @property {Number|String|HTMLElement} [props.label] - an optional label
 * @return {HTMLElement} returns a rendered React component
 */
const Marker = (props) => {
  const {fullAngle, radius, steps, index, label, selected, rest} = props
  const baseAngle = fullAngle / steps
  const maybeSelected = {
    color: (selected ? 'red' : 'black')
  }
  const rotation = Object.assign({
    transform: `rotate(${baseAngle * index + rest}deg) translateY(calc(${radius}px - .5em))`
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
  index: PropTypes.number,
  radius: PropTypes.number,
  steps: PropTypes.number,
  fullAngle: PropTypes.number,
  rest: PropTypes.number,
  label: PropTypes.node
}

export default Marker
