import React from 'react'
import PropTypes from 'prop-types'

const CategorySolutions = ({ category, modeled_solutions_summary }) => {
  return (
    <>
      <section id="modeled_solutions" className="pb-0">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Modeled Solutions</h2>
              <p
                data-cms-editor-link="cloudcannon:#modeled_solutions"
                data-cms-editor-link-style="modal"
                className="cms-editor-link">

                {modeled_solutions_summary}
              </p>
            </div>
          </div>

          <hr className="bg-mid" />
          {/* Loop through modeled solutions */}
        </div>
      </section>
    </>
  )
}

CategorySolutions.propTypes = {
  category: PropTypes.string,
  modeled_solutions_summary: PropTypes.string
}

export default CategorySolutions
