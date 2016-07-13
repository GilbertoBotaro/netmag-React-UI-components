import React, {Component, PropTypes} from 'react' // eslint-disable-line no-unused-vars

/**
 * simple Store to handle the state
 * connects to a component and returns a state and update method
 * This component simply exports the state logic to a higher level
 * to allow having stateless child components.
 * In a production eviromnment a 'real' Store is recommended
 * @class
 */
class Store extends Component {
  /**
   * @param  {Object} props - component props
   * @param  {Object} props.connect - React component to connect
   */
  constructor(props) {
    super(props)
    this.state = {}
  }
  /**
   * renders the connected component
   * @return {ReactComponent} returns a React component connected to the store
   */
  render() {
    return this.props.connect(this.state, this.setState.bind(this))
  }
}

Store.propTypes = {
  connect: PropTypes.func
}

export default Store
