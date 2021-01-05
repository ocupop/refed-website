import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { formatTotals } from './helpers'

const SolutionsListItem = ({ solution, showIndicators, investmentNeeded, investmentSummary }) => {
  const [solutionTotals, setSolutionTotals] = useState(false)
  const [keyIndicators, setKeyIndicators] = useState(['usDollarsProfit', 'tonsDiverted'])
  const { id, attributes: { name, include_in_model, image_url, definition, data } } = solution

  useEffect(() => {
    if (data) {
      setSolutionTotals(formatTotals(data))
    }

  }, [data])

  return (
    <>
      <div className="row my-5 align-items-start">
        <div className="col-4 col-lg-1">
          <div className="bg-image aspect-1x1 rounded-circle mb-3 mb-lg-0"
            style={{ backgroundImage: `url(${image_url == 'TBD' ? '' : image_url})` }}></div>
        </div>
        <div className="col-lg-11">
          <h4>{name}</h4>
          <p>{definition}</p>
          {showIndicators && (
            <>
              <div className="key-indicators-box d-flex flex-column flex-sm-row bg-lighter p-3 text-mid mb-4">
                <div className="key-indicators-box__label d-flex flex-column justify-content-center pr-4 pb-3 pb-sm-0">
                  <div className='stat-text m-0'>Key Indicators</div>
                </div>
                {keyIndicators && keyIndicators.map(uid => {
                  const indicator = solutionTotals[uid]
                  if (indicator) {
                    return (
                      <div key={uid} className="d-flex flex-column px-4 border-left pb-3 pb-sm-0">
                        <span className="display-4 d-block lead">{indicator.prefix}{indicator.formattedValue}</span>
                        <span className="stat-text d-block">{indicator.label}</span>
                      </div>
                    )
                  }
                })}
              </div>
            </>
          )}

          {investmentNeeded && (
            <>
              <div className="row align-items-start">
                <div className="col-md-auto">
                  <div className="display-4">
                    ${investmentNeeded}
                  </div>
                </div>
                <div className="col">
                  <h4>Investment Needed</h4>
                  <p>{investmentSummary}</p>
                </div>
              </div>
            </>
          )}

          {include_in_model ? (
            <>
              <div className="mt-4">
                <a href={`https://insights-engine.vercel.app/solution-database/${id}`} className="btn btn-link mr-4">See Solution Factsheet</a>
                <a href={`https://insights-engine.vercel.app/solution-provider-directory?solution=${id}`} className="btn btn-link">See Solution Provider Directory</a>
              </div>
            </>
          ) : (
              <>
                <p>
                  <a href={`https://insights-engine.vercel.app/solution-database/${id}`} className="btn btn-link">Learn More</a>
                </p>
              </>
            )}

        </div>
      </div>
    </>
  )
}

SolutionsListItem.propTypes = {
  solution: PropTypes.instanceOf(Object)
}

export default SolutionsListItem
