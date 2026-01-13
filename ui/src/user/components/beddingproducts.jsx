import React, { useState } from 'react'
import { GrFavorite } from "react-icons/gr";

function Beddingproducts({pro}) {
    const [selectedColor, setSelectedColor] = useState(0)
    
    return (
        <div className="col-lg-3 p-[4px]">
            <img src={pro.variants[selectedColor].image} />
            <div className='flex justify-between mt-[8px]'>
                <p className='text-[14px]'>{pro.name}</p>
                <GrFavorite className='text-[16px] mt-[3px] font-[300] cursor-pointer' />
            </div>
            <div className="flex gap-3 items-center mt-[8px]">
                {pro.variants.map((variant, index) => (
                    <div 
                        key={index}
                        className={`w-6 h-6 rounded-full cursor-pointer ${selectedColor === index ? 'border border-black' : ''}`}
                        style={{backgroundColor: variant.hex}}
                        onClick={() => setSelectedColor(index)}
                    />
                ))}
            </div>
        </div>
    )
}

export default Beddingproducts