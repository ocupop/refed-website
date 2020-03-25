import React from 'react'
// import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { closeModal } from './modalActions'


const TestModal = ({heading}) => {
  const dispatch = useDispatch()

  return (
    <>
      <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#myModal" onClick={() => dispatch(closeModal())}>
        Open modal
      </button>

      <div class="modal" id="myModal">
        <div class="modal-dialog">
          <div class="modal-content">

            <div class="modal-header">
              <h4 class="modal-title">Modal {heading}</h4>
              <button type="button" class="close" data-dismiss="modal">&times;</button>
            </div>

            <div class="modal-body">
              Woohoo, you are reading this text in a modal!
            </div>

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
            </div>

          </div>
        </div>
      </div>
      
    </>
  )
}

// TestModal.propTypes = {

// }

export default TestModal
