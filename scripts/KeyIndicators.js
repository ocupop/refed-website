import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'


const KeyIndicatorOverview = () => {
  const { categorySolutions, categoryTotals } = useContext(InsightsEngineContext)
  const modeledSolutions = categorySolutions.data ? categorySolutions.data.filter(solution => solution.attributes.include_in_model) : false
  const keyIndicators = [
    "tonsDiverted",
    "usDollarsProfit",
    "usDollarsCost",
    "totalMtco2eAvoided",
    "gallonsWaterSaved",
    "mealsRecovered"
  ]

  if (!categoryTotals) {
    return <p>Loading...</p>
  }
  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 mb-4">
          <span className="display-4 d-block">{modeledSolutions.length}</span>
          <h6>Modeled Solutions</h6>
        </div>
        {keyIndicators && keyIndicators.map(uid => {
          const indicator = categoryTotals[uid]
          if (indicator) {
            return (
              <div key={uid} className="col-12 col-sm-6 mb-4">
                <span className="display-4 d-block">{indicator.prefix}{indicator.formattedValue}</span>
                <h6>{indicator.label}</h6>
              </div>
            )
          }
        })}
      </div>
    </>
  )
}

KeyIndicatorOverview.propTypes = {
  category: PropTypes.string
}

export default KeyIndicatorOverview


