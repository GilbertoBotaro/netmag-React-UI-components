/**
 * @module potentiometer-marker
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'

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
  const {label, selected} = props
  const style = {
    color: (selected ? 'red' : 'black')
  }
  return (
    <div className='marker' style={style}>
      <div>
        <div className='marker-inner'>
          {label} </div>
      </div>
    </div>
  )
}

Marker.propTypes = {
  selected: PropTypes.bool,
  label: PropTypes.node
}

export default Marker
