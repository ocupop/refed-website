import React, { useState, useEffect } from 'react'
import axios from 'axios'
const StakeholdersList = () => {
  const [stakeholders, setStakeholders] = useState([])
  useEffect(() => {
    axios.get(`https://refed-api-staging.herokuapp.com/solution_database/stakeholders`)
      .then(({ data: { data: activeStakeholders } }) => {
        console.log('activeStakeholders', activeStakeholders)
        setStakeholders(activeStakeholders)

      })
      .catch(error => console.log('error', error))
  }, [])
  console.log('stakeholders', stakeholders[0])
  return (
    <>
      <h1>Stakeholders</h1>

      {stakeholders && stakeholders.map(stakeholder => {
        const { id, attributes } = stakeholder

        return (
          <div className="p-5 bg-mid text-white mb-5">
            <p>id: {id}</p>
            <p>name: {attributes.name}</p>
          </div>
        )
      })}


    </>
  )
}

export default StakeholdersList
