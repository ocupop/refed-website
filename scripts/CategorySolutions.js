import React, { useContext, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InsightsEngineContext } from './context'
import SolutionsListItem from './SolutionsListItem'
import { sortBy } from './helpers'

const CategorySolutions = ({ category, modeled_solutions_summary, new_and_emerging_solutions_summary }) => {
  const { categorySolutions, activeCategory, activeIndicator } = useContext(InsightsEngineContext)
  const [pageCategory, setPageCategory] = activeCategory
  const { modeledSolutions, emergingSolutions } = categorySolutions

  useEffect(() => {
    if (category) {
      setPageCategory(category)
    }
  }, [category])


  return (
    <>
      {modeledSolutions && (
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
            {modeledSolutions && modeledSolutions.map(solution => {
              return <SolutionsListItem solution={solution} key={solution.id} showIndicators={true} />
            })}

          </div>
        </section>
      )}
      {emergingSolutions && (
        <section id="unmodeled_solutions" className="pb-0">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <h2>{emergingSolutions.length} Unmodeled Solutions</h2>
                <p
                  data-cms-editor-link="cloudcannon:#new_and_emerging_solutions"
                  data-cms-editor-link-style="modal"
                  className="cms-editor-link">
                  {new_and_emerging_solutions_summary}
                </p>
              </div>
            </div>

            <hr className="bg-mid" />
            {emergingSolutions && emergingSolutions.map(solution => {
              return <SolutionsListItem solution={solution} key={solution.id} showIndicators={false} />
            })}
          </div>
        </section>
      )}
    </>
  )
}

CategorySolutions.propTypes = {
  category: PropTypes.string,
  modeled_solutions_summary: PropTypes.string,
  new_and_emerging_solutions_summary: PropTypes.string
}

export default CategorySolutions
