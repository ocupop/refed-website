import React from 'react'
import PropTypes from 'prop-types'
import {formatDate} from './helpers'

const ListItem = ({item}) => {
  const {title, item_date, summary, url, featured_image, source, link } = item
  return (
    <>
     <div 
      className="row align-items-center my-5 cms-editor-link">
        <div className="col-12 col-sm-9 col-md-4 col-lg-3 mb-3 ">
          <div className="bg-image aspect-4x3 bg-dark flex-grow-1 flex-shrink-1 mr-lg-4" style={ {backgroundImage: "url("+featured_image+")"}}></div>
        </div>
      
        <div className="col-12 col-md-8">
          <h4>
            { title }
          </h4>
          <h6 className="text-gray"> 
              { source && <span>{source} | </span>}
              { item_date && formatDate(item_date) }
          </h6>

          <div  className="border-top border-color-mid pt-3 my-3">
            { summary && summary }
          </div> 
          { link ? <a href={ link } className="btn btn-link" target="_blank">Read More</a> : <a href={url} className="btn btn-link">Read More</a>}
        </div>
      </div>
    </>
  )
}

ListItem.propTypes = {
  item: PropTypes.instanceOf(Object)
}

export default ListItem
