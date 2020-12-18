import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { InsightsEngineContext } from '../context'
import { getIndicatorOptions } from '../helpers'

const TopSolutions = ({ stakeholder }) => {
  const { topSolutions, activeIndicator, activeStakeholder } = useContext(InsightsEngineContext)
  const [pageStakeholder, setPageStakeholder] = activeStakeholder
  const [indicator, setIndicator] = activeIndicator

  const options = getIndicatorOptions()

  useEffect(() => {
    if (stakeholder) {
      setPageStakeholder(stakeholder)
    }
  }, [stakeholder])

  return (
    <>
      {activeIndicator && (
        <div className="py-5">
          <div className="row align-items-center mb-3">
            <div className="col-12 col-lg-6">
              <h3>Top 5 Solutions for <span className="text-capitalize">{pageStakeholder}</span></h3>
            </div>
            <div className="col-12 col-lg-6">
              <Select
                options={options}
                onChange={({ value }) => setIndicator(value)}
                defaultValue={{ value: 'tons-diverted', label: "Food Waste Tons Diverted" }}
              />
            </div>
          </div>
          {topSolutions && topSolutions.map(solution => {
            return (
              <div key={solution.id} className="row no-gutters align-items-center border">
                <div className="col-12 col-md-6 col-lg-4">
                  <div className="py-2 px-3">{solution.name}</div>
                </div>
                <div className="col-12 col-md-6 col-lg-8">
                  <div className="d-flex align-items-center p-2">
                    <div className="progress flex-fill">
                      <div className="progress-bar bg-primary" role="progressbar" style={{ width: `${solution.percentage}%` }} aria-valuenow={solution.percentage} aria-valuemin="0" aria-valuemax="100"></div>
                    </div>
                    <span className="ml-3">{solution.formattedValue}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

TopSolutions.propTypes = {

}

export default TopSolutions
