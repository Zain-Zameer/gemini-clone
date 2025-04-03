import React from 'react'
import ReactMarkdown from "react-markdown"

const userPrompt = (props) => {
  return (
    <>
   <div className='flex justify-end'>
      <div className='w-fit bg-[#e3efff] mt-[90px] rounded-bl-[50px] rounded-br-[50px] rounded-tl-[50px] rounded-tr-[5px] p-[11px] '>
        <ReactMarkdown>
          {props.prompt.replace(/\n/g, '  \n')}
        </ReactMarkdown>
      </div>
    </div>
    </>
  )
}

export default userPrompt