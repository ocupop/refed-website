import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { formatMoney, toCamel } from '../helpers'
import { INDICATORS } from '../constants'


const KeyIndicators = ({ category }) => {
  const [keyIndicators, setKeyIndicators] = useState(false)

  useEffect(() => {
    axios.get(`https://api.refed.com/v2/solution_database/solutions/?category=${category}`)
      .then(({ data: { meta: { total: { attributes: { data } } } } }) => {
        // Data is an array of objects ({indicator, value})
        console.log(data)
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <>
      <div className="row">
        {keyIndicators && keyIndicators.map(item => {
          return (
            <div className="col-12 col-sm-6 mb-4">
              <span className="display-4 d-block">{item.value}</span>
              <h6 className="stat-text text-primary">{metrics[item.indicator]}</h6>
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
