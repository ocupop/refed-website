import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { SOLUTIONS_ENDPOINT, INDICATOR_MAP } from '../constants'
import { liquidToJSON } from '../helpers'

const SolutionGroup = ({ category, slugs }) => {
  const [solutions, setSolutions] = useState(false)

  useEffect(() => {
    axios.get(`${SOLUTIONS_ENDPOINT}?category=${category}`)
      .then(({ data: response }) => {
        const solutions = slugs.split(',')

        if (solutions.length > 0) {
          solutions.map(solution => {
            console.log("SOLUTION:", solution)
            // console.log(liquidToJSON(solution))
          })
        }

        console.log(response.data)
        // const solutions = response.data
        //   .filter(solution => solution.attributes.include_in_model)
        //   .map(solution => {
        //     const { name, data, definition } = solution.attributes
        //     return {
        //       name,
        //       definition,
        //       data,
        //     }
        //   })
        // console.log(sortBy({ solutions, indicator }).slice(0, 5))
        // setTopSolutions(sortBy({ solutions, indicator }).slice(0, 5))
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <>
      {solutions && solutions.map(solution => {
        return (
          <div className="row align-items-start my-3">
            <div className="col-4 col-lg-1">
              <i className="icon icon-sm sticky"></i>
            </div>
            <div className="col-lg-11">
              <h6 className="editable global-editor-link">Modeled Solution</h6>
              <div className="row">
                <div className="col-md-auto">
                  <div>${solution.value}</div>
                </div>
                <div className="col">
                  <h4>{solution.name}</h4>
                  <p>{solution.definition}</p>
                </div>
              </div>
              <div className="mt-5">
                <a href="#" className="btn btn-link mr-4">See Solution Factsheet</a>
                <a href="#" className="btn btn-link">See Solution Provider Database</a>
              </div>
            </div>
          </div>
        )
      })}
    </>
  )
}

SolutionGroup.propTypes = {

}

export default SolutionGroup
