import React from 'react'

const option = (props) => {
  return (
    <>
        <div className='flex items-center justify-between cursor-pointer hover:bg-[#cecece3d] p-[7px_9px] rounded-[40px]'>
              <div className='flex items-center gap-[1vw]'>
                {props.ownIcon?props.ownIcon:<img src="../diamond.svg" alt="" className='w-[17px] object-contain'/>}
                <h4 className='text-[13px] text-[#575b5f]'>{props.title}</h4>
              </div>
              <div>
                
              </div>
            </div>
    </>
  )
}

export default option   