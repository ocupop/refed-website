import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from './constants'
import { formatTotals } from './helpers'


// const initialState = {
//   category: null,
//   filteredSolutions: null,
//   topSolutions: [],
// }
// const initialState = {}
const InsightsEngineContext = React.createContext()

const InsightsEngineProvider = ({ children }) => {
  // const [state, setState] = useState(initialState)
  const [allSolutions, setAllSolutions] = useState(false)
  const [activeCategory, setActiveCategory] = useState(false)
  const [categorySolutions, setCategorySolutions] = useState(false)
  const [categoryTotals, setCategoryTotals] = useState(false)
  const [indicator, setIndicator] = useState(false)
  const [topSolutions, setTopSolutions] = useState(false)
  const state = {
    allSolutions,
    activeCategory,
    categorySolutions,
    categoryTotals,
    indicator,
    topSolutions
  }

  // useEffect(() => {
  //   axios.get(SOLUTIONS_ENDPOINT)
  //     .then(({ data: response }) => {
  //       console.log(response)
  //       // setAllSolutions(response)
  //     })
  //     .catch(error => console.log('error', error))
  // }, [])


  useEffect(() => {
    if (activeCategory) {
      axios.get(`${SOLUTIONS_ENDPOINT}/?category=${activeCategory}`)
        .then(({ data: response }) => {
          // console.log(activeCategory, response)
          setCategorySolutions(response)
          setCategoryTotals(formatTotals(response.meta.total.attributes.data))
        })
        .catch(error => console.log('error', error))
    }
  }, [activeCategory])

  // useEffect(() => {
  //   if (indicator) {
  //     // TODO: Add logic for sorting top solutions based on indicator
  //     console.log(indicator)
  //     // setTopSolutions([])
  //   }
  // }, [indicator])

  // useEffect(() => {
  //   console.log("STATE:", state)
  // }, [state])

  return (
    <InsightsEngineContext.Provider value={{
      activeCategory: [activeCategory, setActiveCategory],
      indicator: [indicator, setIndicator],
      allSolutions: allSolutions,
      categorySolutions: categorySolutions,
      categoryTotals: categoryTotals,
      topSolutions: topSolutions
    }}>
      {children}
    </InsightsEngineContext.Provider>
  )

}

export { InsightsEngineContext, InsightsEngineProvider }