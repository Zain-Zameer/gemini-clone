import React from 'react'

const botReply = (props) => {
  return (
    <>
    <div className='flex items-start gap-[20px] mt-[80px] mb-[30px]'>
                  <div>
                    <img src="../gemini-color.svg" className='w-[25px]' alt="" />
                  </div>
                  <div className='flex flex-col gap-[15px]'>
                    <div>
                      <h3>{props.reply}</h3>
                    </div>
                    <div className='flex items-center gap-[10px]'>
                      <div className='cursor-pointer hover:bg-[#cecece3d] p-[5px] rounded-[50px]'>

                      <img src="./thumbs-up.png" alt="" className='w-[15px]' />
                      </div>
                      <div className='cursor-pointer hover:bg-[#cecece3d] p-[5px] rounded-[50px]'>

                      <img src="./negative-vote.png" alt="" className='w-[15px]'/>
                      </div>
                      <div className='cursor-pointer hover:bg-[#cecece3d] p-[5px] rounded-[50px]'>

                      <img src="./reply.png" alt="" className='w-[20px]'/>
                      </div>
                      <div className='cursor-pointer hover:bg-[#cecece3d] p-[5px] rounded-[50px]'>

                      <img src="./share.png" alt="" className='w-[15px]'/>
                      </div>
                      <div className='cursor-pointer hover:bg-[#cecece3d] p-[5px] rounded-[50px]'>

                      <img src="./more.png" alt="" className='w-[15px]'/>
                      </div>
                    </div>
                  </div>
                </div>
    </>
  )
}

export default botReply 