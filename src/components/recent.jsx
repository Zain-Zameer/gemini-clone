import React from 'react'

const recent = (props) => {
  return (
    <>
    <div className='flex cursor-pointer hover:bg-[#cecece3d] items-center justify-between px-[7px] pr-[15px] py-[4px] rounded-[40px]'>
                <div className='flex items-center  justify-between'>
                    <div className='p-[4px] rounded-[50px] border border-[#00000000]'>

                  <img src="../public/menu.png" alt="menu-icon-recents" className="w-[20px] "/>
                    </div>
                    <div>

                  <h4 className='text-[13px] whitespace-nowrap overflow-hidden text-ellipsis text-[#575b5f]'>{props.title}</h4>
                    </div>
                </div>
                <div className='flex items-center'>
                  <img src="../public/more.png" alt="more-recent-icon" className="w-[15px]" />
                </div>
              </div>
    </>
  )
}

export default recent