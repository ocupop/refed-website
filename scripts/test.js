import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'

const Test = () => {
  const { state } = useContext(InsightsEngineContext)

  return (
    <div>
      <h5>Indicator: {state.indicator}</h5>
    </div>
  )
}

Test.propTypes = {

}

export default Test
