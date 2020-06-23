import React from 'react'
import { useDispatch } from 'react-redux'

import { closeModal } from './modalActions'

const ImageModal = ({ image }) => {
  const dispatch = useDispatch()

  return (
    <>
      TODO: Make this image modal work using bootstrap native.
      <img src={image} className="img-fluid" />
    </>
  )
}

export default ImageModal

/*
// OLD content that was returned before switching to bootstrap.native 

  <Modal show onHide={() => dispatch(closeModal())}>
    <Modal.Header closeButton></Modal.Header>
    <Modal.Body>
      <img src={image} className="img-fluid" />
    </Modal.Body>
  </Modal>

*/
