import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

const API_ENDPOINT = 'https://api.refed.com/v2/surplus/by_cause'
// Example: https://api.refed.com/v2/surplus/by_cause/?sector=retail
// I am moving to a CMS based solution for the short term. To avoid complex logic.

const Causes = ({ sector }) => {
  const [causes, setCauses] = useState(false)

  useEffect(() => {
    axios.get(`${API_ENDPOINT}/?sector=${sector}`)
      .then(({ data: { included } }) => {
        const causes = included.map(cause => cause.attributes.name)

        console.log(causes)

        setCauses(causes)
      })
      .catch(error => console.log('error', error))

  }, [])

  return (
    <div>

    </div>
  )
}

Causes.propTypes = {

}

export default Causes
