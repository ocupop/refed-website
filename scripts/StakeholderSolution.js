import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'
import SolutionsListItem from './SolutionsListItem'

const StakeholderSolution = ({ slug, investmentneeded }) => {
  const { allSolutions } = useContext(InsightsEngineContext)
  const solution = allSolutions ? allSolutions.find(solution => solution.id === slug) : false

  return (
    <>
      {solution && (
        <SolutionsListItem solution={solution} investmentNeeded={investmentneeded} />
      )}
    </>
  )
}

StakeholderSolution.propTypes = {
  slug: PropTypes.string,
  investmentneeded: PropTypes.string,
}

export default StakeholderSolution
