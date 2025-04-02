import Gems from './components/gems'
import Option from './components/option'
import Recent from './components/recent'
import UserPrompt from "./components/userPrompt.jsx"
import BotReply from "./components/botReply.jsx"
import './index.css'

function App() {

  return (
    <>
      <div className="container h-[100vh] w-[100vw] flex ">
        <div className="left relative p-[26px_23px] h-[100%] w-[21vw] bg-[#f0f4f9] flex flex-col">

          
        <div className="more-options ">
            {/* add more options icon  */}
            <button className='cursor-pointer hover:bg-[#cecece3d] rounded-[50px] w-fit p-[10px]'>
              <img src="../public/menu.png" alt="menu-icon" className='w-[25px]' />
            </button>
          </div>
          
          <div className="new-chat-box mt-[50px] mb-[40px] ">
            {/* add new chat button  */}
            <button className='bg-[#d0d0d04f] z-99999 p-[10px_16px] w-fit rounded-[40px] flex items-center bg-none gap-[21px] text-[13px] text-[#4447464a] font-[600]'>
              <img src="../public/plus.png" alt="new-chat-icon" className="w-[13px] object-contain" />
              <span>New chat</span>
            </button>
          </div>
          
          <div className="recent-gems flex flex-col gap-[18px] h-[51vh] overflow-x-hidden overflow-y-auto 
            scrollbar-hide hover:scrollbar-default">
            {/* recent section  */}
            <div className="recent flex flex-col gap-[5px]">
              <h3 className='font-[500] text-[14px]'>Recent</h3>
              {/* my recents  */}

              {/* recent 01  */}
              <Recent title={"Benefits of reading"}/>
              <Recent title={"Javascript scrolling"}/>
              <Recent title={"Data Mining"}/>
              <Recent title={"Object detection using YOLO"}/>
              <Recent title={"Chef assistant agent"}/>
              {/* recent 01 end */}

              {/* recent more option  */}
              <div className='flex cursor-pointer hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[10px]'>
                <div className="p-[4px] rounded-[50px] border border-[#00000000]">

                <img src="../public/down.png" alt="more-options-icon" className="w-[15px]" />
                </div>


                <h4 className='text-[13px] text-[#575b5f]'>More</h4>
              </div>

            </div>
            {/* gems section  */}
            <div className="gems flex flex-col gap-[5px]">
                <h3 className='font-[500] text-[14px]'>Gems</h3>
                
                {/* gem 01 */}
                <Gems title={"Chess champ"} icon={"../chess.svg"} backColor={"#ffd095"}/>
                <Gems title={"Brainstormer"} icon={"../bulb.svg"} backColor={"#ffcdab"}/>
                <Gems title={"Career guide"} icon={"../career.svg"} backColor={"#ffc9d3"}/>

                {/* more gems option  */}
                <div className='flex cursor-pointer hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[1vw]'>
                  <div className="p-[1px] pl-[5px] rounded-[50px] border border-[#00000000]">
                      <img src="../public/down.png" alt="more-options-icon" className="w-[15px]" />
                  </div>
                <h4 className='text-[13px] text-[#575b5f]'>More</h4>
              </div>
            </div>
          </div>
          
          <div className="footer flex flex-col mt-[13px] mb-[20px] p-[5px_0px]">
            {/* add gem manager, help, settings,activity here  */}

            {/* gem manager  */}
            <Option title={"Gem manager"} ownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12 3L3 12l9 9 9-9-9-9z"/>
</svg>}/>

            {/* help  */}
            <Option title={"Help"} ownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="12" cy="12" r="10"></circle>
  <path d="M12 16h.01"></path>
  <path d="M12 12c1.5 0 2-1 2-2s-1-2-2-2-2 .9-2 2"></path>
</svg>
}/>
           
            {/* activity  */}
            <Option title={"Activity"} ownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 24 24" fill="#000000">
  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8z"/>
  <path d="M12.5 7H11v6l5.2 3.2.8-1.3-4.5-2.7V7z"/>
</svg>}/>

            {/* settings  */}
            <Option title={"Settings"} ownIcon={<svg xmlns="http://www.w3.org/2000/svg" width="17" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.72l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.72l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.72V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.72l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.72v-.5a2 2 0 0 1 1-1.72l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.72V4a2 2 0 0 0-2-2z"/>
  <circle cx="12" cy="12" r="3"/>
</svg>}/>

          </div>
          <div className="location absolute flex bottom-0 items-start gap-[9px]">
            {/* here you can add the location of user  */}
            <div className='flex items-start'>
              -
            </div>
            <div className='flex flex-col text-[11px]'>
              <div className='font-[500]'><h3>Rawalpindi, Pakistan</h3></div>
              <div className='flex text-[#0062d0]'><h3>From your IP address</h3><span> - </span><h3>Update location</h3></div>
            </div>
          </div>



        </div>


        <div className="right h-[100%] w-[80vw] ">
          
          {/* navbar  */}
          <div className="navbar flex justify-between p-[8px]">
            <div className='flex flex-col z-99999 cursor-pointer hover:bg-[#cecece6e] p-[5px_11px] rounded-[9px]'>
                <div className='flex gap-[15px]'>
                    <h3 className='text-[18px]'>Gemini</h3>
                    <img src="./down_second.png" alt="down-sign" className='w-[11px] object-contain' />
                </div>
                <div>
                    <h3 className='text-[13px] text-[#575b5f] font-[500]'>2.0 Flash</h3>
                </div>
            </div>
            <div className='flex items-center gap-[20px]'>
              <div>
                  <button className='z-99999 cursor-pointer flex items-center text-[13px] font-[500] rounded-[6px] p-[8px] pl-6 pr-5 gap-2 bg-[#dde3ea]'><img src="../gemini-color.svg" alt="gemini-icon"/> Try Gemini Advanced</button>
              </div>
              <div>
                <button><img src="./folder.png" alt="folder-icon" className='z-99999 cursor-pointer w-[20px] flex items-center' /></button>
              </div>
              
              <div>
                <button><img src="./show-apps-button.png" alt="show-apps-icon" className='z-99999 cursor-pointer w-[20px] flex items-center' /></button>
              </div>

              <div>
                <img src="./profile.png" alt="user-profile" className='w-[30px] z-99999 cursor-pointer rounded-[50px] object-cover'/>
              </div>

            </div>
          </div>
            
          {/* main chat area  */}
          <div className='w-[100%] h-[90vh] flex flex-col items-center'>
              <div className="chatArea  w-[65%] h-[80%]  relative overflow-y-auto overflow-x-hidden scrollbar-hide">

                {/* user message */}
                <UserPrompt prompt={"Hi I am the message"}/>

                {/* bot reply  */}
                <BotReply reply={'Hello \"the message\"! It\'s nice to meet you. Is there anything I can help you with today?'}/>
                {/* user message */}
                <UserPrompt prompt={"Hi I am the message"}/>

                {/* bot reply  */}
                <BotReply reply={'Hello \"the message\"! It\'s nice to meet you. Is there anything I can help you with today?'}/>
                {/* user message */}
                <UserPrompt prompt={"Hi I am the message"}/>

                {/* bot reply  */}
                <BotReply reply={'Hello \"the message\"! It\'s nice to meet you. Is there anything I can help you with today?'}/>
                
               
              </div>

              <div className="prompt-box z-99999 bg-[white] border w-[70%] h-[16%] border-[grey]  bottom-0 left-25 rounded-[26px] p-[10px_24px] flex flex-col gap-[30px]">
                <input type="text" className='w-[100%] border-none outline-none' placeholder='Ask Gemini'/>
                <div className='flex justify-between'>
                  <div className='flex gap-[16px]'>
                      <button><img src="./plus.png" className='w-[12px]' alt="" /></button>
                      <button className='flex gap-[5px] text-[15px] items-center'><img src="./writing.png" className='w-[12px] object-contain' alt="" />Canvas</button>
                  </div>
                  <div>
                    <button><img src="./microphone-black-shape.png" className='w-[15px]' alt="" /></button>
                  </div>
                </div>
              </div>
              
          </div>

        </div>
      </div>
    </>
  )
}

export default App
