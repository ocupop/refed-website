import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

const List = ({source}) => {
  const [allListItems, setAllListItems] = useState(false)
  useEffect(() => {
    axios.get(`https://caring-ship.cloudvent.net/api/${source}.json`)
      .then(response => {
        setAllListItems(response.data)
      })
      .catch(error => console.log('error', error))
  }, [])
  console.log('all list items', allListItems)
  return (
    <>
     {allListItems && allListItems.map(item => {
        return <ListItem key={item.id} item={item}/>
      })}
    </>
  )
}

List.propTypes = {
  source: PropTypes.string
}

export default List
