import React from 'react'
import PropTypes from 'prop-types'
import {formatDate} from './helpers'

const EventCard = ({event}) => {
  const {title, item_date, date_label, description, url, featured_image } = event
  return (
    <div className="card mb-4">
      <div className="bg-image aspect-4x3 bg-dark" style={ {backgroundImage: "url("+featured_image+")"}}>
      </div>
      <div className="card-body">
        <h4>{ title && title }</h4>
        <h6 className="text-gray">{ item_date && formatDate(item_date) }</h6>
        <hr/>
        {/* <div dangerouslySetInnerHTML={description}/></div> */}
        <div dangerouslySetInnerHTML={ {__html: description }}>
        </div>
        <a href={ url && url } className="btn btn-link">Read More</a>  
      </div>
    </div>
  )
}

EventCard.propTypes = {
  event: PropTypes.instanceOf(Object)
}

export default EventCard
