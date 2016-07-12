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
const Poti = (props) => {
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
    const {markers, min, max, step, value} = props
    const steps = Math.round((max - min) / step)
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
      const selected = val === index
      const style = {
        color: (selected ? 'red' : 'black')
      }
      return <span key={index}
                   className='marker'
                   style={style}>{marker}</span>
    })
  }
  return (
    <label className='poti'>
      <div className='knob-wrapper'>
        <div className='knob'> knob </div>
        <div className='markers'>
          {getMarkers()} </div>
      </div>
      {props.children}
      <input type='range'
             min={props.min}
             max={props.max}
             step={props.step}
             name={props.name}
             onChange={props.onChange}
             value={Number(props.value)}/> </label>
  )
}

Poti.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  name: PropTypes.string,
  children: PropTypes.node,
  markers: PropTypes.array,
  onChange: PropTypes.func
}

Poti.defaultProps = {
  min: 0,
  max: 100,
  value: 50,
  step: 1
}

export default Poti
