import React, { Component } from 'react'
import loading from './loading.gif'
import PropTypes from 'prop-types'


export class Spinner extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  render() {
    return (
      <div className='text-center'>
        <img src = {loading} alt="loading" />
      </div>
    )
  }
}

export default Spinner
