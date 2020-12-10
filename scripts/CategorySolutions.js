import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'
import SolutionsListItem from './SolutionsListItem'

const CategorySolutions = ({ category, modeled_solutions_summary, new_and_emerging_solutions_summary }) => {
  const { state, setCategory } = useContext(InsightsEngineContext)
  const { filteredSolutions } = state

  const modeledSolutions = filteredSolutions ? filteredSolutions.data.filter(solution => solution.attributes.include_in_model) : false
  const emergingSolutions = filteredSolutions ? filteredSolutions.data.filter(solution => !solution.attributes.include_in_model) : false

  useEffect(() => {
    console.log("Cat:", category)
    if (category) {
      setCategory(category)
    }
  }, [category])


  return (
    <>
      <section id="modeled_solutions" className="pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{modeledSolutions.length} Modeled Solutions</h2>
              <p
                data-cms-editor-link="cloudcannon:#modeled_solutions"
                data-cms-editor-link-style="modal"
                className="cms-editor-link">
                {modeled_solutions_summary}
              </p>
            </div>
          </div>

          <hr className="bg-mid" />
          {modeledSolutions && modeledSolutions.map(solutionData => <SolutionsListItem solution={solutionData} />)}

        </div>
      </section>
      <section id="new_and_emerging_solutions" className="pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>{emergingSolutions.length} New &amp; Emerging Solutions</h2>
              <p
                data-cms-editor-link="cloudcannon:#new_and_emerging_solutions"
                data-cms-editor-link-style="modal"
                className="cms-editor-link">
                {new_and_emerging_solutions_summary}
              </p>
            </div>
          </div>

          <hr className="bg-mid" />
          {emergingSolutions && emergingSolutions.map(solutionData => <SolutionsListItem solution={solutionData} />)}
        </div>
      </section>
    </>
  )
}

CategorySolutions.propTypes = {
  category: PropTypes.string,
  modeled_solutions_summary: PropTypes.string,
  new_and_emerging_solutions_summary: PropTypes.string
}

export default CategorySolutions
