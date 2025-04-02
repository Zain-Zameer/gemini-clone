import React from 'react'

const userPrompt = (props) => {
  return (
    <>
    <div className='relative -right-[35vw] w-fit bg-[#e3efff] mt-[90px]  rounded-bl-[50px] rounded-br-[50px] rounded-tl-[50px] rounded-tr-[5px] p-[11px]'>
                  {props.prompt}
                </div>
    </>
  )
}

export default userPrompt