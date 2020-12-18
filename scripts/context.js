import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from './constants'
import { sortBy, formatTotals, getIndicatorValue, abbreviateNumber, toCamel } from './helpers'



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
  const [activeStakeholder, setActiveStakeholder] = useState('retailers')
  const [activeIndicator, setActiveIndicator] = useState('tons-diverted')
  const [topSolutions, setTopSolutions] = useState(false)
  const state = {
    allSolutions,
    activeCategory,
    categorySolutions,
    categoryTotals,
    activeIndicator,
    activeStakeholder,
    topSolutions
  }

  // All Solutions
  useEffect(() => {
    axios.get(SOLUTIONS_ENDPOINT)
      .then(({ data: response }) => {

        setAllSolutions(response)
      })
      .catch(error => console.log('error', error))
  }, [])

  // Category Solutions
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

  // Top Solutions
  useEffect(() => {
    if (activeIndicator && activeStakeholder) {
      // TODO: Add logic for sorting top solutions based on indicator
      console.log("Calculating top solutions:", activeIndicator)
      axios.get(`${SOLUTIONS_ENDPOINT}?stakeholder=${activeStakeholder}`)
        .then(({ data: response }) => {
          const orderedSolutions = response.data
            .filter(solution => solution.attributes.include_in_model)
            .map(solution => {
              const { name, data, definition } = solution.attributes
              const indicator = INDICATOR_MAP[toCamel(activeIndicator)]
              const value = data.find(metric => metric.indicator == activeIndicator).value

              return {
                id: solution.id,
                name,
                definition,
                data,
                value,
                formattedValue: abbreviateNumber(value),
                label: indicator.label
              }
            })
            .sort((a, b) => a.value < b.value ? 1 : -1)

          const solutions = orderedSolutions
            .map(solution => {
              const percentage = (solution.value / orderedSolutions[0].value * 100).toFixed(1)
              return { ...solution, percentage }
            })
            .slice(0, 5)

          setTopSolutions(solutions)
        })
        .catch(error => console.log('error', error))
    }
  }, [activeIndicator])

  // useEffect(() => {
  //   console.log("STATE:", state)
  // }, [state])

  return (
    <InsightsEngineContext.Provider value={{
      activeCategory: [activeCategory, setActiveCategory],
      activeIndicator: [activeIndicator, setActiveIndicator],
      activeStakeholder: [activeStakeholder, setActiveStakeholder],
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