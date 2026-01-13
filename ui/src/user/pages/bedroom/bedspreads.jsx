import React, { useEffect, useState } from 'react'
import Beddingproducts from '../../components/beddingProducts'
import FullScreenLoader from '../../components/fullScreenLoader'

function Bedspreads() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("http://localhost:3000/bedroombedspreads")
      .then(res => res.json())
      .then((pro) => {
        setTimeout(() => {
          setData(pro)
          setLoading(false)
        }, 1000)
      })
  }, [])

  if (loading) {
    return <FullScreenLoader />
  }

  return (
    <div className='row flex px-4 mt-[240px] '>
      {data.map(e => (
        <Beddingproducts pro={e} key={e.id} />
      ))}
    </div>
  )
}

export default Bedspreads
