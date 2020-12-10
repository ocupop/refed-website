import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { sortBy, getIndicatorValue, abbreviateNumber, toCamel } from '../helpers'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from '../constants'

const TopSolutions = ({ stakeholder }) => {
  const [topSolutions, setTopSolutions] = useState(false)
  const [indicator, setIndicator] = useState('tons-diverted')

  useEffect(() => {
    axios.get(`${SOLUTIONS_ENDPOINT}?stakeholder=${stakeholder}`)
      .then(({ data: response }) => {
        const solutions = response.data
          .filter(solution => solution.attributes.include_in_model)
          .map(solution => {
            const { name, data, definition } = solution.attributes
            return {
              name,
              definition,
              data,
            }
          })
        console.log(sortBy({ solutions, indicator }).slice(0, 5))
        setTopSolutions(sortBy({ solutions, indicator }).slice(0, 5))
      })
      .catch(error => console.log('error', error))

  }, [])


  return (
    <>
      <div className="py-5">
        <h3>Top 5 Solutions for <span className="text-capitalize">{stakeholder}</span></h3>
        {topSolutions && topSolutions.map(solution => {
          return (
            <div className="row no-gutters align-items-center border">
              <div className="col-6 col-md-4">
                <div className="py-2 px-3">{solution.name}</div>
              </div>
              <div className="col-6 col-md-8">
                <div className="d-flex align-items-center p-2">
                  <div className="progress flex-fill">
                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>
                  <span className="ml-3">{abbreviateNumber(getIndicatorValue(solution.data, indicator))} {INDICATOR_MAP[toCamel(indicator)].label}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </>
  )
}

TopSolutions.propTypes = {

}

export default TopSolutions
