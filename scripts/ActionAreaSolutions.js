import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const SOLUTIONS_URL = 'https://api.refed.com/v2/solution_database/solutions'

const ActionAreaSolutions = ({ category, modeled }) => {
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
        const emmissionsReduction = data.find(item => item.indicator === 'total-mtco2e-avoided').value
        const investmentNeeded = data.find(item => item.indicator === 'us-dollars-cost').value

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
                    <div className="key-indicators-box__stat d-flex flex-column pl-4 pr-4 border-left pb-3 pb-sm-0">
                      {emmissionsReduction ? (
                        <span className="stat-number d-block lead">{Math.round((emmissionsReduction / 100000) * 10) / 10}M Tons</span>
                      ) : (
                          <span className="stat-number d-block lead">N/A</span>
                        )}
                      <span className="stat-text d-block">Emissions Reduction</span>
                    </div>

                    <div className="key-indicators-box__stat d-flex flex-column pl-4 border-left pb-3 pb-sm-0">
                      {investmentNeeded ? (
                        <span className="stat-number d-block lead">${Math.round((investmentNeeded / 100000) * 10) / 10}M</span>
                      ) : (
                          <span className="stat-number d-block lead">N/A</span>
                        )}
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
