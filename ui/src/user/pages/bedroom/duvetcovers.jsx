import React, { useEffect, useState } from 'react'
import FullScreenLoader from '../../components/fullScreenLoader'
import SecondaryNavbar from '../../components/secondaryNavbar'
import DuvetCoverproducts from '../../components/duvetcoverProducts'

function Bedspreads() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
   const [colSize, setColSize] = useState(3);

  useEffect(() => {
    fetch("http://localhost:3000/bedroomduvetcovers")
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
    <>
      <SecondaryNavbar colSize={colSize} setColSize={setColSize} />
      <div className='row flex px-4 mt-[240px] '>
  {data.map(e => (
    <DuvetCoverproducts pro={e} key={e.id} colSize={colSize} />
  ))}
</div>

    </>
  )
}

export default Bedspreads
