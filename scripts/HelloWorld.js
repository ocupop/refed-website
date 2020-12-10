import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'

const HelloWorld = ({ category }) => {
  const { state, setIndicator } = useContext(InsightsEngineContext)

  return (
    <>
      {/* <h5>Solutions: {state.allSolutions.data.length}</h5> */}
      <p><strong>Category: {category}</strong></p>
      <p><strong>Indicator: {state.indicator}</strong></p>
      <button className="btn btn-primary" onClick={() => setIndicator('another')}>Click</button>

    </>
  )
}

HelloWorld.propTypes = {
  category: PropTypes.string
}

export default HelloWorld
