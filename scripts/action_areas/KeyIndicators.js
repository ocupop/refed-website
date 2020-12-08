import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { formatMoney, toCamel, abbreviateNumber } from '../helpers'
import { INDICATOR_MAP } from '../constants'


const KeyIndicators = ({ category }) => {
  const [emergingSolutions, setEmergingSolutions] = useState(false)
  const [modeledSolutions, setModeledSolutions] = useState(false)
  const [keyIndicators, setKeyIndicators] = useState(false)

  const formatTotals = (totals) => {

    const formattedTotals = totals.map(total => {
      const indicator = INDICATOR_MAP[toCamel(total.indicator)]
      const { prefix, label } = indicator
      const formattedValue = abbreviateNumber(total.value)
      return { prefix, label, formattedValue }
    })
    return formattedTotals
  }

  useEffect(() => {
    axios.get(`https://api.refed.com/v2/solution_database/solutions/?category=${category}`)
      .then(({ data: response }) => {
        const modeledSolutions = response.data.filter(solution => solution.attributes.include_in_model)
        const emergingSolutions = response.data.filter(solution => !solution.attributes.include_in_model)
        const totals = response.meta.total.attributes.data

        setModeledSolutions(modeledSolutions)
        setEmergingSolutions(emergingSolutions)
        setKeyIndicators(formatTotals(totals))
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 mb-4">
          <span className="display-4 d-block">{modeledSolutions.length}</span>
          <h6>Modeled Solutions</h6>
        </div>
        {keyIndicators && keyIndicators.map(indicator => {
          return (
            <div className="col-12 col-sm-6 mb-4">
              <span className="display-4 d-block">{indicator.prefix}{indicator.formattedValue}</span>
              <h6>{indicator.label}</h6>
            </div>
          )
        })}
      </div>
    </>
  )
}

KeyIndicators.propTypes = {
  category: PropTypes.string
}

export default KeyIndicators


