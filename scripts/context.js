import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from './constants'

const InsightsEngineContext = React.createContext([{}, () => { }])

const initialState = {
  category: '',
  allSolutions: {
    data: [],
    included: [],
    meta: {}
  },
  topSolutions: [],
  indicator: 'tons-diverted'
}

const InsightsEngineProvider = ({ children }) => {
  const [state, setState] = useState(initialState)
  const setIndicator = (indicator) => {
    setState({ ...state, indicator })
  }

  useEffect(() => {
    axios.get(SOLUTIONS_ENDPOINT)
      .then(({ data: response }) => {

        setState({ ...state, allSolutions: response })
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <InsightsEngineContext.Provider value={{ state, setIndicator }}>
      {children}
    </InsightsEngineContext.Provider>
  )

}

export { InsightsEngineContext, InsightsEngineProvider }