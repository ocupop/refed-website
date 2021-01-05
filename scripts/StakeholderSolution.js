import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'
import SolutionsListItem from './SolutionsListItem'

const StakeholderSolution = ({ slug, investmentneeded, investmentsummary }) => {
  const { allSolutions } = useContext(InsightsEngineContext)
  const solution = allSolutions.data ? allSolutions.data.find(solution => solution.id === slug) : false
  console.log("SOLUTION:", solution)
  console.log("NEEDED:", investmentneeded)
  console.log("SUMMARY:", investmentsummary)
  return (
    <>
      {solution && (
        <SolutionsListItem solution={solution} investmentNeeded={investmentneeded} investmentSummary={investmentsummary} />
      )}
    </>
  )
}

StakeholderSolution.propTypes = {
  slug: PropTypes.string,
}

export default StakeholderSolution
