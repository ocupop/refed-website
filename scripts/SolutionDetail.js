import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const SolutionDetail = ({ endpoint }) => {
  const [solution, setSolution] = useState([])
  useEffect(() => {
    axios.get(endpoint)
      .then(({ data }) => {
        setSolution(data)
      })
      .catch(error => console.log('error', error))
  }, [])
  console.log('solution', solution)
  return (
    <div className="bg-lighter text-dark mb-5 p-3">
      <p><strong>API Enpoint</strong> {endpoint}</p>
      <div>{solution && JSON.stringify(solution, null, 2)}</div>
    </div>
  )
}

SolutionDetail.propTypes = {
  endpoint: PropTypes.string
}

export default SolutionDetail
