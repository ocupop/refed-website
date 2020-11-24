import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'
import SOLUTIONS_DATA from './solutions'

const SOLUTIONS_URL = 'https://api.refed.com/v2/solution_database/solutions'
const INDICATORS_URL = 'https://api.refed.com/v2/solution_database/indicators'

// const solutions = SOLUTIONS_DATA.data

const SolutionsList = ({ category }) => {
  const [solutions, setSolutions] = useState(false)
  const [indicators, setIndicators] = useState(false)

  useEffect(() => {
    axios.get(`${SOLUTIONS_URL}`)
      .then(({ data: { data: solutions } }) => {
        setSolutions(solutions)
      })
      .catch(error => console.log('error', error))

    axios.get(`${INDICATORS_URL}`)
      .then(({ data: { data: indicators } }) => {
        setIndicators(indicators)
      })
      .catch(error => console.log('error', error))
  }, [])

  return (
    <>
      {solutions && solutions.map(solution => {
        const { id, attributes: { name, image_url, definition } } = solution
        const emmissionsReduction = 0
        const investmentNeeded = 0

        return (
          <div className="row my-5">
            <div className="col-4 col-lg-1">
              <div className="bg-image aspect-1x1 rounded-circle mb-3 mb-lg-0"
                style={{ backgroundImage: `url(${image_url})` }}></div>
            </div>
            <div className="col-lg-11">
              <h4>{name}</h4>
              <p className="alert alert-warning">Solution: description/definition does not exist in API</p>

              <div className="key-indicators-box d-flex flex-column flex-sm-row bg-lighter p-3 text-mid mb-4">

                <div className="key-indicators-box__label d-flex flex-column justify-content-center pr-4 pb-3 pb-sm-0">
                  <div className='stat-text m-0'>Key Indicators</div>
                </div>
                <div className="key-indicators-box__stat d-flex flex-column pl-4 pr-4 border-left pb-3 pb-sm-0">
                  <span className="stat-number d-block lead">{emmissionsReduction}M Tons</span>
                  <span className="stat-text d-block">Emissions Reduction</span>
                </div>

                <div className="key-indicators-box__stat d-flex flex-column pl-4 border-left pb-3 pb-sm-0">
                  <span className="stat-number d-block lead">${investmentNeeded}M</span>
                  <span className="stat-text d-block">Investment Needed</span>
                </div>
                {/* {indicators && indicators.map(indicator => {

                  return (
                    <div className="key-indicators-box__stat d-flex flex-column pl-4 pr-4 border-left pb-3 pb-sm-0">
                      <span className="stat-number d-block lead">XX</span>
                      <span className="stat-text d-block">{indicator.attributes.name}</span>
                    </div>
                  )
                })} */}
              </div>

              <div className="d-flex flex-column flex-lg-row">
                <a href={`https://insights-engine.vercel.app/solution-database/${id}`} className="btn btn-link mr-4">See Solution Factsheet</a>
                <a href={`https://insights-engine.vercel.app/solution-database`} className="btn btn-link">See Solution Provider Database</a>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

SolutionsList.propTypes = {

}

export default SolutionsList
