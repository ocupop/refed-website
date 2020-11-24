import React, { useState, useEffect } from 'react'
// import PropTypes from 'prop-types'
import axios from 'axios'

const INSIGHTS_ENGINE_API = 'https://api.refed.com/v2/solution_database/solutions'

const SolutionsListItem = ({ slug, metrics }) => {
  console.log(metrics.split(','))
  const [solution, setSolution] = useState(false)
  useEffect(() => {
    axios.get(`${INSIGHTS_ENGINE_API}/${slug}`)
      .then(({ data: { data: { attributes: solution } } }) => {
        console.log(solution)
        const val = solution.data.find(metric => {
          return metrics == metric.slug
        }).value
        console.log(metrics, val)
        setSolution(solution)
      })
      .catch(error => console.log('error', error))
  }, [])

  return (
    <>
      {solution && (
        <div className="row my-5">
          <div className="col-4 col-lg-1">
            <div className="bg-image aspect-1x1 rounded-circle mb-3 mb-lg-0"
              style={{ backgroundImage: `url(${solution.image_url})` }}></div>
          </div>
          <div className="col-lg-11">
            <h4>{solution.name}</h4>
            <p>{solution.definition}</p>

            <div className="key-indicators-box d-flex flex-column flex-sm-row bg-lighter p-3 text-mid mb-4">

              <div className="key-indicators-box__label d-flex flex-column justify-content-center pr-4 pb-3 pb-sm-0">
                <div className='stat-text m-0'>Key Indicators</div>
              </div>

              <div className="key-indicators-box__stat d-flex flex-column pl-4 pr-4 border-left pb-3 pb-sm-0">
                <span className="stat-number d-block lead">3M Tons</span>
                <span className="stat-text d-block">Emissions Reduction</span>
              </div>

              <div className="key-indicators-box__stat d-flex flex-column pl-4 border-left pb-3 pb-sm-0">
                <span className="stat-number d-block lead">$123M</span>
                <span className="stat-text d-block">Investment Needed</span>
              </div>
            </div>

            <div className="d-flex flex-column flex-lg-row">
              <a href={`https://insights-engine.vercel.app/solution-database/${slug}`} className="btn btn-link mr-4">See Solution Factsheet</a>
              <a href={`https://insights-engine.vercel.app/solution-database`} className="btn btn-link">See Solution Provider Database</a>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

SolutionsListItem.propTypes = {

}

export default SolutionsListItem
