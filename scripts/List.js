import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import ListItem from './ListItem'

const List = () => {
  const [allListItems, setAllListItems] = useState(false)
  useEffect(() => {
    axios.get(`https://caring-ship.cloudvent.net/api/articles.json`)
      .then(response => {
        setAllListItems(response.data)
      })
      .catch(error => console.log('error', error))
  }, [])
  console.log('all list items', allListItems)
  return (
    <>
     {allListItems && allListItems.map((listItem, index) => {
        return <ListItem key={index} listItem={listItem}/>
      })}
    </>
  )
}

List.propTypes = {

}

export default List
