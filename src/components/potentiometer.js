/**
 * Potentiometers are commonly used to control electrical devices such
 * as volume controls on audio equipment. (wikipedia)
 * @module potentiometer
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {PropTypes} from 'react'
import classnames from 'classnames'
import Marker from './potentiometer-marker'
import Knob from './potentiometer-knob'


const staticStyles = {
  knobWrapper: {
    position: 'relative'
  },
  markers: {
    fontSize: '1rem',
    position: 'absolute',
    left: '50%',
    top: '50%'
  }
}


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
const Poti = (props) => {
  const {markers, min, max, step, size, value, onChange, name, fullAngle, className} = props
  const range = (max - min)
  const rest = (360 - fullAngle) / 2
  const baseAngle = fullAngle / range
  const rotation = rest + (value - min) * baseAngle
  const steps = Math.round(range / step)

  /**
   * a function to return the markers
   * @param  {Object} props otions
   * @param {Number} [props.min=0] - min value
   * @param {Number} [props.max=100] - max value
   * @param {Number} [props.step=1] - step value
   * @param {Number} [props.value=50] - value
   * @param {Array} [props.markers] -
   *        an optional list of markers.
   *        can be less than steps as long as it can be divided evenly.
   *        If less markes than steps are defined the gaps will be filled
   *        with empty markers
   * @return {Array} returns a list of markers
   */
  const getMarkers = () => {
    const arr = []
    for (let i = 0; i <= steps; i++) {
      if (markers) {
        const index = i / steps * (markers.length - 1) % markers.length
        arr.push(markers[index] || <div className='marker-indicator'/>)
      } else {
        arr.push(Math.round(i + min / step) * step)
      }
    }

    return arr.map((marker, index) => {
      const val = Math.round((value - min) / step)
      return <Marker key={index}
                     fullAngle={fullAngle}
                     steps={steps}
                     radius={size / 2}
                     rest={rest}
                     index={index}
                     selected={val === index}
                     label={marker}/>
    })
  }

  const handleChange = (e) => onChange(e.target.value)

  const knobWrapperStyle = Object.assign({
    fontSize: size / 2,
    height: size,
    width: size
  }, staticStyles.knobWrapper)

  const classes = classnames('poti', className)
  return (
    <label className={classes}>
      <div className='knob-wrapper' style={knobWrapperStyle}>
        <Knob rotation={rotation}/>
        <div className='markers' style={staticStyles.markers}>
          {getMarkers()}
        </div>
      </div>
      {props.children}
      <input type='range'
             min={min}
             max={max}
             step={step}
             name={name}
             onChange={handleChange}
             value={Number(value)}/>
    </label>
  )
}

Poti.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node,
  fullAngle: PropTypes.number,
  size: PropTypes.number,
  markers: PropTypes.array,
  onChange: PropTypes.func
}

Poti.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  fullAngle: 300,
  size: 100,
  step: 1
}

export default Poti
