import React from 'react'

const gems = (props) => {
  return (
    <>
        <div className='flex cursor-pointer hover:bg-[#cecece3d] items-center justify-between px-[7px] pr-[15px] py-[5px] rounded-[40px]'>
                  <div className='flex items-center gap-[1vw] justify-between'>
                    <div style={{ backgroundColor: props.backColor }} className={`flex items-center justify-center p-[5px] rounded-[50px]`}>
                        <img src={props.icon} alt="" className='w-[15px] object-contain' />
                    </div>
                    <div>
                    <h4 className='text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#575b5f]'>{props.title}</h4>
                    </div>
                  </div>
                  <div className='flex items-center'>
                    <img src="../public/more.png" alt="more-gem-icon" className='w-[15px]'/>
                  </div>
                </div>
    </>
  )
}

export default gems