import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import { SOLUTIONS_ENDPOINT } from '../constants'

const TopSolutions = ({ stakeholder }) => {
  const [topSolutions, setTopSolutions] = useState(false)

  useEffect(() => {
    axios.get(`${SOLUTIONS_ENDPOINT}?stakeholder=${stakeholder}`)
      .then(({ data: response }) => {
        console.log(response.data)

        // setTopSolutions()
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <>
      <div className="d-flex align-items-center border">
        <div className="p-2">Solution Name</div>
        <div className="p-2 flex-fill">
          <div className="progress">
            <div className="progress-bar bg-primary" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
        </div>
      </div>
    </>
  )
}

TopSolutions.propTypes = {

}

export default TopSolutions
