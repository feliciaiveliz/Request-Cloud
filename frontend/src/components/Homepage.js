import { useState, useEffect } from 'react'
import Bins from '../services/bins.js'

const Homepage = () => {
  let [bins, setBins] = useState([])

  useEffect(() => {
      Bins.getAll().then(bins => {
        setBins(bins)
      })
  }, [])

  return (
    <div>
      {bins.map(id => {
        return (
          <div>
            <h3>{id}</h3>
          </div>
        )
      })}
    </div>
  )
}

export default Homepage
