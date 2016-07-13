/**
 * @module helpers
 * @author Gregor Adams <greg@pixelass.com>
 */

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

export {always, never, coordToDeg, offset}
