import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { formatMoney } from './helpers'

const SOLUTIONS_URL = 'https://api.refed.com/v2/solution_database/solutions'

const ActionAreaSolutions = ({ category, modeled = false }) => {
  const [solutions, setSolutions] = useState(false)

  useEffect(() => {
    axios.get(`${SOLUTIONS_URL}/?category=${category}`)
      .then(({ data: { data } }) => {
        const filteredSolutions = modeled
          ? data.filter(solution => solution.attributes.include_in_model)
          : data.filter(solution => !solution.attributes.include_in_model)
        setSolutions(filteredSolutions)
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <>
      {solutions && solutions.map(solution => {
        const { id, attributes: { name, image_url, definition, data } } = solution

        // TODO: This can be promoted to a helper method at some point
        const formatIndicator = (indicator) => {
          const val = data.find(item => item.indicator === indicator).value
          const roundedVal = Math.round((val / 100000) * 10) / 10
          return `${roundedVal}M Tons`
        }

        const formatValue = (indicator) => {
          const val = data.find(item => item.indicator === indicator).value
          const roundedVal = Math.round((val / 100000) * 10) / 10
          return `${formatMoney(roundedVal)}M`
        }



        return (
          <div className="row my-5">
            <div className="col-4 col-lg-1">
              <div className="bg-image aspect-1x1 rounded-circle mb-3 mb-lg-0"
                style={{ backgroundImage: `url(${image_url})` }}></div>
            </div>
            <div className="col-lg-11">
              <h4>{name}</h4>
              <p>{definition}</p>

              {modeled ? (
                <>
                  <div className="key-indicators-box d-flex flex-column flex-sm-row bg-lighter p-3 text-mid mb-4">
                    <div className="key-indicators-box__label d-flex flex-column justify-content-center pr-4 pb-3 pb-sm-0">
                      <div className='stat-text m-0'>Key Indicators</div>
                    </div>
                    {/* <div className="key-indicators-box__stat d-flex flex-column pl-4 pr-4 border-left pb-3 pb-sm-0">
                      <span className="display-4 d-block lead">{formatIndicator('total-mtco2e-avoided')}</span>
                      <span className="stat-text d-block">CO2e Reduction</span>
                    </div> */}

                    {/* <div className="key-indicators-box__stat d-flex flex-column pl-4 border-left pb-3 pb-sm-0">
                      <span className="display-4 d-block lead">{formatMoney('us-dollars-cost')}</span>
                      <span className="stat-text d-block">Investment Needed</span>
                    </div> */}

                    <div className="d-flex flex-column px-4 border-left pb-3 pb-sm-0">
                      <span className="display-4 d-block lead">{formatMoney('us-dollars-financial-benefit')}</span>
                      <span className="stat-text d-block">Financial Benefit</span>
                    </div>
                    <div className="d-flex flex-column px-4 border-left pb-3 pb-sm-0">
                      <span className="display-4 d-block lead">{formatIndicator('tons-diverted')}</span>
                      <span className="stat-text d-block">Waste Diverted</span>
                    </div>
                  </div>

                  <div className="">
                    <a href={`https://insights-engine.vercel.app/solution-database/${id}`} className="btn btn-link mr-4">See Solution Factsheet</a>
                    <a href={`https://insights-engine.vercel.app/solution-provider-directory?solution=${id}`} className="btn btn-link">See Solution Provider Directory</a>
                  </div>
                </>
              ) : (
                  <p>
                    <a href={`https://insights-engine.vercel.app/solution-database/${id}`} className="btn btn-link">Learn More</a>
                  </p>
                )}
            </div>
          </div>
        )
      })}
    </>
  )
}

ActionAreaSolutions.propTypes = {
  category: PropTypes.string
}

export default ActionAreaSolutions
