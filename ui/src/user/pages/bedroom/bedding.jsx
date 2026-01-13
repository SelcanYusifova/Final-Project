import React, { useEffect, useState } from 'react'
import SecondaryNavbar from '../../components/secondaryNavbar'
import Beddingproducts from '../../components/beddingproducts'

function Bedding() {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch("http://localhost:3000/bedroombedding")
      .then(res => res.json())
      .then((pro) => {
        setData(pro)
      })
  }, [])
  console.log(data);


  return (
    <>
      <SecondaryNavbar />
      <div className='row flex px-4 mt-[240px] '>
        {
          data.map(e => (
            <Beddingproducts pro={e} key={e.id} />
          ))
        }
      </div>
    </>
  )
}

export default Bedding