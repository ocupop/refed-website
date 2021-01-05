import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from './constants'
import { formatTotals, abbreviateNumber, toCamel } from './helpers'


const InsightsEngineContext = React.createContext()

const InsightsEngineProvider = ({ children }) => {
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

  const getSolutionDetails = (solution) => {
    const { name, data, definition, include_in_model, image_url } = solution.attributes
    const indicator = INDICATOR_MAP[toCamel(activeIndicator)]
    const value = data.find(metric => metric.indicator == activeIndicator).value
    return {
      id: solution.id,
      name,
      definition,
      include_in_model,
      image_url,
      data,
      value,
      formattedValue: abbreviateNumber(value),
      label: indicator.label
    }
  }

  const getOrderedSolutions = (data) => {
    const solutions = data
      .filter(solution => solution.attributes.include_in_model)
      .map(solution => getSolutionDetails(solution))
      .sort((a, b) => a.value < b.value ? 1 : -1)
    return solutions
  }

  // All Solutions
  useEffect(() => {
    axios.get(SOLUTIONS_ENDPOINT)
      .then(({ data: response }) => {
        const solutions = response.data.map(solution => getSolutionDetails(solution))
        setAllSolutions(solutions)
      })
      .catch(error => console.log('error', error))
  }, [])

  // Category Solutions
  useEffect(() => {
    if (activeCategory) {
      axios.get(`${SOLUTIONS_ENDPOINT}/?category=${activeCategory}`)
        .then(({ data: response }) => {
          const modeledSolutions = getOrderedSolutions(response.data)
          const emergingSolutions = response.data
            .filter(solution => !solution.attributes.include_in_model)
            .map(solution => getSolutionDetails(solution))

          setCategorySolutions({ modeledSolutions, emergingSolutions })
          setCategoryTotals(formatTotals(response.meta.total.attributes.data))
        })
        .catch(error => console.log('error', error))
    }
  }, [activeCategory, activeIndicator])

  // Top Solutions
  useEffect(() => {
    if (activeIndicator && activeStakeholder) {
      // console.log("Calculating top solutions:", activeIndicator)
      axios.get(`${SOLUTIONS_ENDPOINT}?stakeholder=${activeStakeholder}`)
        .then(({ data: response }) => {
          const orderedSolutions = getOrderedSolutions(response.data)
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