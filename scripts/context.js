import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from './constants'
import { formatTotals } from './helpers'


const initialState = {
  category: null,
  allSolutions: {
    data: [],
    included: [],
    meta: {}
  },
  filteredSolutions: {
    data: [],
    included: [],
    meta: {}
  },
  topSolutions: [],
  indicator: 'tons-diverted'
}
// const initialState = {}
const InsightsEngineContext = React.createContext([initialState, () => { }])

const InsightsEngineProvider = ({ children }) => {
  const [state, setState] = useState(initialState)

  const setIndicator = (indicator) => {
    setState({ ...state, indicator })
  }

  const setCategory = (category) => {
    setState({ ...state, category })
  }

  // useEffect(() => {
  //   axios.get(SOLUTIONS_ENDPOINT)
  //     .then(({ data: response }) => {

  //       setState({ ...state, allSolutions: response })
  //     })
  //     .catch(error => console.log('error', error))
  // }, [])

  useEffect(() => {
    if (state.category) {
      // console.log("getting category solutions")
      axios.get(`${SOLUTIONS_ENDPOINT}/?category=${state.category}`)
        .then(({ data: response }) => {
          const categoryTotals = formatTotals(response.meta.total.attributes.data)
          setState({ ...state, filteredSolutions: response, categoryTotals: categoryTotals })
        })
        .catch(error => console.log('error', error))
    }
  }, [state.category])

  // useEffect(() => {
  //   console.log("STATE:", state)
  // }, [state])

  return (
    <InsightsEngineContext.Provider value={{ state, setIndicator, setCategory }}>
      {children}
    </InsightsEngineContext.Provider>
  )

}

export { InsightsEngineContext, InsightsEngineProvider }