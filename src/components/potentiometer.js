/**
 * Potentiometers are commonly used to control electrical devices such
 * as volume controls on audio equipment. (wikipedia)
 * @module potentiometer
 * @author Gregor Adams <greg@pixelass.com>
 */

import React, {Component, PropTypes} from 'react'
import classnames from 'classnames'
import Knob from './potentiometer-knob'
import Marker from './potentiometer-marker'
import OneListener from 'one-listener'

const always = new OneListener({
  limit: 0,
  throttle: 50
})

const never = new OneListener({
  limit: Infinity
})

/**
 * coverts coordinates to degree
 * @param  {Object} pointer - contains `x` and `y` offset of pointer
 * @param  {Number} size - size of element
 * @return {Number} returns the degree value
 */
const coordToDeg = (pointer, size) => {
  const center = size / 2
  const dX = pointer.x - center
  const dY = pointer.y - center
  const teta = Math.atan(dY / dX) * 180 / Math.PI + 90
  if ((dX < 0 && dY >= 0) || (dX < 0 && dY < 0)) {
    return teta
  } else {
    return teta + 180
  }
}

/**
 * calculate and return the offset of the pointer within an element
 * @param  {Event} e - a mouse event
 * @param  {HTMLElement} el the element that defines the bounds
 * @return {Object} returns the `x` and `y` offset of pointer
 */
const offset = (e, el) => {
  const boundingClientRect = el.getBoundingClientRect()
  const {top, left} = boundingClientRect
  const x = e.clientX - left
  const y = e.clientY - top
  return {
    x,
    y
  }
}

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
 * @param  {Object} props - a collection of props used
 *                          to define the component
 * @param {Number} props.min - minimum value
 * @param {Number} props.max - maximum value
 * @param {Number} props.step - step between values
 * @param {Number} props.value - current value of the component
 * @param {String} props.name - name of the input (used for forms)
 * @param {Number} props.fullAngle - full angle of rotation in deg
 * @param {Number} props.size - height and width of pointer aware area
 * @param {Array|String} props.children -
 *   collection of elements or a plain text to show below the poti.
 *   Usually used to add labels
 * @param {Array} props.markers -
 *   a list of markers to distribute around the poti. The content
 *   can be a string a component or an HTML element
 * @return {HTMLElement} returns a rendered React component
 */
class Poti extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.handleMouseUp = this.handleMouseUp.bind(this)
    this.handleMouseDown = this.handleMouseDown.bind(this)
    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleTouchStart = this.handleTouchStart.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  /**
   * tell the component that the mouse is being clicked
   * sets the state so the `mousemove` handler can use it as a flag
   * @param  {Event} e - the mousedown event
   */
  handleMouseDown(e) {
    this.updateValue(e)
    this.setState({
      down: true
    })
  }

  /**
   * tell the component that the component is being touched
   * sets the state so the `mousemove` handler can use it as a flag
   * also differs from the `handleMouseDown` handler by calling
   * `e.preventDefault()` to prevent scrolling.
   * @param  {Event} e - the touchstart event
   */
  handleTouchStart(e) {
    e.preventDefault()
    this.updateValue(e)
    this.setState({
      down: true
    })
  }

  /**
   * tell the component that the mouse NOT is being clicked
   * sets the state so the `mousemove` handler can use it as a flag
   * @param  {Event} e - the mouseup event
   */
  handleMouseUp() {
    this.setState({
      down: false
    })
  }

  /**
   * handles the movement of the mouse
   * @param  {Event} e - the mousemove event
   */
  handleMouseMove(e) {
    if (this.state.down) {
      e.preventDefault()
      this.updateValue(e)
    }
  }

  /**
   * handles most of the logic gets the knobWrapper and the pointer offset
   * then converts the pointer position to degrees, the degrees to a value
   * and calls the `onChange` callback of the component
   * @param  {Event} e - a mouse event
   */
  updateValue(e) {
    const event = {
      clientX: e.clientX,
      clientY: e.clientY
    }
    const {touches} = e
    if (touches && touches[0]) {
      event.clientX = touches[0].clientX
      event.clientY = touches[0].clientY
    }
    const {min, onChange, size, fullAngle, step} = this.props
    const {knobWrapper} = this.refs
    const pointer = offset(event, knobWrapper)
    const deg = coordToDeg(pointer, size)
    const boundDeg = Math.max(0, Math.min(fullAngle, deg - this.rest))
    const rawValue = (boundDeg / fullAngle * this.range + min)
    const value = Math.round(rawValue / step) * step
    onChange(value)
  }

  /**
   * change handler. calls the `onChange` callback of the component
   * @param  {Event} e - the change event
   */
  handleChange(e) {
    this.props.onChange(e.target.value)
  }

  /**
   * handles the blur event
   * calls the components `onBlur` callback and removes the focused state
   * @param  {Event} e - the blur event
   */
  handleBlur(e) {
    this.setState({
      focused: false
    })
    this.props.onBlur(e)
  }

  /**
   * handles the focus event
   * calls the components `onFocus` callback and adds the focused state
   * @param  {Event} e - the focuse event
   */
  handleFocus(e) {
    this.setState({
      focused: true
    })
    this.props.onFocus(e)
  }

  /**
   * helper that returns the range
   * @return {Number} - the difference between `min` and `max`
   */
  get range() {
    return this.props.max - this.props.min
  }

  /**
   * helper that returns the steps
   * @return {Number} returns the number of steps from `min` to `max`
   */
  get steps() {
    return Math.round(this.range / this.props.step)
  }

  /**
   * returns the rest angle which is half of the difference between
   * `fullAngle` and 360
   * @return {Number} [description]
   */
  get rest() {
    return (360 - this.props.fullAngle) / 2
  }

  /**
   * returns the markers
   * @return {Array} - a list of `Marker` components
   */
  get markers() {
    const {markers, min, size, step, value, fullAngle} = this.props
    const arr = ((n) => {
      const a = []
      for (let i = 0; i <= n; i++) {
        if (markers) {
          const index = i / this.steps * (markers.length - 1) % markers.length
          a.push(markers[index] || <div className='marker-indicator'/>)
        } else {
          a.push(Math.round(i + min / step) * step)
        }
      }
      return a
    })(this.steps)

    return arr.map((marker, index) => {
      const val = Math.round((value - min) / step)
      return <Marker key={index}
                     label={marker}
                     rest={this.rest}
                     index={index}
                     fullAngle={fullAngle}
                     radius={size / 2}
                     steps={this.steps}
                     selected={val === index}/>
    })
  }

  componentWillMount() {
    this.cancelMove = always.requestEventListener('mousemove', this.handleMouseMove)
    this.cancelUp = never.requestEventListener('mouseup', this.handleMouseUp)
    this.cancelTouchMove = always.requestEventListener('touchmove', this.handleMouseMove)
    this.cancelTouchEnd = always.requestEventListener('touchend', this.handleMouseUp)
  }

  componentWillUnMount() {
    this.cancelMove()
    this.cancelUp()
    this.cancelTouchMove()
    this.cancelTouchEnd()
  }

  render() {
    const {min, max, step, value, size, children, fullAngle, className} = this.props
    const baseAngle = fullAngle / this.range
    const rotation = this.rest + (value - min) * baseAngle
    const knobWrapperStyle = Object.assign({
      fontSize: size / 2,
      height: size,
      width: size
    }, staticStyles.knobWrapper)

    /* show a range input and a knob that rotates
     * if we interact with the range-element
     */
    const classes = classnames({
      focused: this.state.focused
    }, 'poti', className)

    return (
      <label className={classes}>
        <div style={knobWrapperStyle}
             className='knob-wrapper'
             ref='knobWrapper'
             onMouseDown={this.handleMouseDown}
             onTouchStart={this.handleTouchStart}>
          <Knob rotation={rotation}/>
          <div style={staticStyles.markers}>
            {this.markers}
          </div>
        </div>
        {children}
        <input type='range'
               min={min}
               max={max}
               step={step}
               value={value}
               onChange={this.handleChange}
               onFocus={this.handleFocus}
               onBlur={this.handleBlur}/>
      </label>
    )
  }
}

Poti.propTypes = {
  min: PropTypes.number,
  max: PropTypes.number,
  step: PropTypes.number,
  value: PropTypes.number,
  fullAngle: PropTypes.number,
  size: PropTypes.number,
  markers: PropTypes.array,
  children: PropTypes.element,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
}

Poti.defaultProps = {
  min: 0,
  max: 100,
  step: 1,
  value: 50,
  fullAngle: 300,
  size: 100,
  onChange() {},
  onBlur() {},
  onFocus() {}
}

export default Poti
