import Gems from './components/gems.jsx'
import Option from './components/option.jsx'
import Recent from './components/recent.jsx'
import UserPrompt from "./components/userPrompt.jsx"
import BotReply from "./components/botReply.jsx"
import './index.css'
import { useState,useEffect,useRef } from 'react'
import ReactMarkdown from 'react-markdown';


function App() {
  const [recents, setrecents] = useState([
    // {title:"Understanding Large Language Model"},
    // {title:"Javascript scrolling"},
    // {title:"Data Mining"},
    // {title:"Object detection using YOLO"},
    // {title:"Chef assistant agent1"},
    // {title:"Chef assistant agent2"},
    // {title:"Chef assistant agent3"},
    // {title:"Chef assistant agent4"},
    // {title:"Chef assistant agent5"},
    
  ])
  const [gems, setGems] = useState([
    {title:"Chess champ",icon:"../chess.svg",backColor:"#ffd095"},
    {title:"Brainstormer",icon:"../bulb.svg",backColor:"#ffcdab"},
    {title:"Career guide",icon:"../career.svg",backColor:"#ffc9d3"},
    {title:"Chess champ",icon:"../chess.svg",backColor:"#ffd095"},
    {title:"Chess champ",icon:"../chess.svg",backColor:"#ffd095"},
    {title:"Chess champ",icon:"../chess.svg",backColor:"#ffd095"},
    
  ])

  const [currentChats, setcurrentChats] = useState([])
  const [getRecents, setgetRecents] = useState(false)
  const [useChats, setuseChats] = useState([])

  const [gotResponse, setgotResponse] = useState(false)
  const scrollIt = useRef(null)
   
  const [moreThan5Recent, setmoreThan5Recent] = useState(false)
  const [moreThan3Gems, setmoreThan3Gems] = useState(false)
  const [moreClicked, setmoreClicked] = useState(false)
  const [moreGemsClicked, setmoreGemsClicked] = useState(false)

  const [chatStarted, setchatStarted] = useState(false)

  const [promptState, setpromptState] = useState('')
  const newChatRef = useRef(null)

  // useEffect(()=>{
  //   console.log(promptState)
  // },[promptState])

  const scrollToBottom = () => {
    // Scroll to the last chat item (user or bot)
    if (scrollIt.current) {
      scrollIt.current.scrollTop = scrollIt.current.scrollHeight;
    }
  };
  
  useEffect(() => {
    // Scroll to bottom whenever currentChats changes (i.e., after user or bot sends a message)
    scrollToBottom();
  }, [currentChats]);

  useEffect(() => {
    scrollToBottom();
  }, [useChats])
  
  useEffect(() => {
    const fetchCollections = async () => {
      try {
        let response = await fetch("http://localhost:3000/receive/collections");
        response = await response.json()
        const formattedData = response.map(text => ({ title: text }));
        setrecents(formattedData);
        console.log(response)
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
  
    fetchCollections();
  
  },[]); 

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        let response = await fetch("http://localhost:3000/receive/collections");
        response = await response.json()
        const formattedData = response.map(text => ({ title: text }));
        setrecents(formattedData);
        console.log(response)
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };
  
    fetchCollections();
  }, [getRecents])
  
 
  
  const newPromptVal = (e) => {
    setpromptState(e.target.value)
  }
  const sendPrompt =  async(e) =>{
    
    
      if(e.key=="Enter" && e.shiftKey){
        // console.log("Enter + Shift pressed")
        
        
      }
      else if(e.key=="Enter"){
        // scrollIt.current.scrollTop = 5000
        // scrollIt.current.scrollTo({
          //   top: 1000,
        //   behavior: 'smooth'
        // })
        
        // setpromptState(false)
        setgotResponse(true)
        e.preventDefault()
        // console.log("Enter key pressed")
          setchatStarted(true)
          
          let textPrompt = promptState
          setpromptState("")
          setuseChats([textPrompt])
          // console.log("sending prompt to bot")
          let BotReply = await fetch(`http://localhost:3000/${textPrompt}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" }
        })
          BotReply = await BotReply.json()
          // console.log()
          let data = {user:textPrompt,bot:BotReply.text}
          setuseChats([])
          setgotResponse(false)
          setcurrentChats((prevChats)=>[...prevChats,data])
          newChatRef.current.style.color = "black"
          newChatRef.current.style.backgroundColor = "#b9b9b975"
          // scrollIt.current.scrollTop = 5000;
          setdisableNewChat(false)
          
        setpromptState('')
        }
      // setgotResponse(false)
  }



  useEffect(() => {
    let val = recents.length;
    if(val>=5){
      setmoreThan5Recent(true);
    }
  
  },[recents])

  useEffect(()=>{
    console.log(recents)

  },[recents])

  useEffect(()=>{
    if(recents.length >=1 || gems.length>=1){
      gems_recents_hide.current.style.visibility="visible";
    }
  },[recents,gems])

  const gems_recents_hide = useRef(null)

  useEffect(() => {
    let val = gems.length;
    if(val>=3){
      setmoreThan3Gems(true);
    }
  
  },[gems])

  const changeMore = ()=>{
    setmoreClicked(!moreClicked);
  }
  let recentTitleCol = useRef(null)
  // current working area 
  const newChatClicked = async() => {
    setgetRecents(true)
    
    // console.log()
    let summarizeRecentTitle = await fetch(`http://localhost:3000/getSubject/${currentChats[0].bot}`,{
            method: "POST",
            headers: { "Content-Type": "application/json" }}) 
    summarizeRecentTitle = await summarizeRecentTitle.json()
    let subjectLine = summarizeRecentTitle.subject
    // console.log(summarizeRecentTitle)
    let myChats = currentChats
    if(recentTitleCol.current){
      let responseChats = await fetch(`http://localhost:3000/getCol/${recentTitleCol.current}`)
      responseChats = await responseChats.json()
      let mergeChatsDBUser = [...myChats,...responseChats]
      // Create a frequency map based on `user + bot` string
      const freqMap = new Map();
      for (const item of mergeChatsDBUser) {
        const key = `${item.user}|${item.bot}`;
        freqMap.set(key, (freqMap.get(key) || 0) + 1);
      }

      // Filter out items that appear only once based on that key
      myChats = mergeChatsDBUser.filter(item => {
        const key = `${item.user}|${item.bot}`;
        return freqMap.get(key) === 1;
      });

      

    }
    let recentSave = {title:subjectLine}
    
    // combine responseChats and myChats
    
    // console.log(uniqueOnly)

    setrecents((prevRecents)=>[...prevRecents,recentSave])
    let titles = new Set()
    recents.map((item)=>{
      titles.add(item.title)
    })
    let data = []
    titles.forEach((item)=>{
      data.push({title:item})
    })

    setrecents(data)
    // console.log(recents)
    
    // console.log(recents)

    // uncomment this soon below

    setcurrentChats([])
    setchatStarted(false)
    newChatRef.current.style.color = "grey"
    let respone = await fetch(`http://localhost:3000/savechat/save`,{
      method: "POST",
      headers: { "Content-Type": "application/json" },body: JSON.stringify({
        chatArray: myChats,
        colName: subjectLine
    })})
    
    setgetRecents(false)

    recentTitleCol.current = null
  }
  const recentClicked=async(e)=>{
    console.log(e.target.textContent)
    let recentTitle = e.target.textContent;
    recentTitleCol.current = recentTitle
    let responseChats = await fetch(`http://localhost:3000/getCol/${recentTitle}`)
    responseChats = await responseChats.json()

    console.log(responseChats)
    setchatStarted(true)
    setcurrentChats([])
    newChatRef.current.style.color = "black"
    newChatRef.current.style.backgroundColor = "#b9b9b975"
    // scrollIt.current.scrollTop = 5000;
    setdisableNewChat(false)
    
    // getting unique responseChats
 

    responseChats.map((item)=>{
      let newItem = {user:item.user,bot:item.bot};
      setcurrentChats((prevChats)=>[...prevChats,newItem])
    })
  }
  const changeMoreGem = ()=>{

    setmoreGemsClicked(!moreGemsClicked);
  }
  const [disableNewChat, setdisableNewChat] = useState(true)
 
  

  return (
    <>
      <div className="container h-[100vh] w-[100vw] flex ">
        <div className="left relative p-[26px_23px] h-[100%] w-[21vw] bg-[#f0f4f9] flex flex-col">

          
        <div className="more-options ">
            {/* add more options icon  */}
            <button className='cursor-pointer hover:bg-[#cecece3d] rounded-[50px] w-fit p-[10px]'>
              <img src="/menu.png" alt="menu-icon" className='w-[25px]' />
            </button>
          </div>
          
          <div className="new-chat-box mt-[50px] mb-[40px] ">
            {/* add new chat button  */}
            <button ref={newChatRef} disabled={disableNewChat} onClick={newChatClicked} className='bg-[#d0d0d04f] cursor-pointer z-99999 p-[10px_16px] w-fit rounded-[40px] flex items-center bg-none gap-[21px] text-[13px] text-[#4447464a] font-[500]'>
              <img src="/plus.png" alt="new-chat-icon" className="w-[13px] object-contain" />
              <span>New chat</span>
            </button>
          </div>
          
          {(gems || recents) && <div ref={gems_recents_hide} className="recent-gems invisible flex flex-col gap-[18px] h-[51vh] overflow-x-hidden overflow-y-auto 
            scrollbar-hide hover:scrollbar-default">
            {/* recent section  */}
            <div className="recent flex flex-col gap-[5px]">
              {recents.length>=1 && <h3 className='font-[500] text-[14px]'>Recent</h3>}
              {/* my recents  */}

              {/* recent 01  */}
              {recents  && !moreClicked &&
                    recents.map((recentItem,index)=>(
                    index<5?<Recent title={recentItem.title} recentClicked={recentClicked}/>:""
                    
              ))}
              
              {recents  && moreClicked &&
                    recents.map((recentItem,index)=>(
                    <Recent title={recentItem.title} recentClicked={recentClicked}/>
                    
              ))}

              {/* recent 01 end */}

              {/* recent more option  */}
              {moreThan5Recent && !moreClicked && <div className='flex  hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[10px]'>
                <div className="p-[4px] rounded-[50px] border border-[#00000000]">

                <img src="/down.png" alt="more-options-icon" className="w-[15px]" />
                </div>


                <h4 className='text-[13px] text-[#575b5f]'><button onClick={changeMore} className='cursor-pointer'>More</button></h4>
              </div>}

              {moreThan5Recent && moreClicked && <div className='flex cursor-pointer hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[10px]'>
                <div className="p-[4px] rounded-[50px] border border-[#00000000]">

                <img src="../public/up-arrow.png" alt="more-options-icon" className="w-[9px]" />
                </div>


                <h4 className='text-[13px] text-[#575b5f]'><button onClick={changeMore} className='cursor-pointer'>Less</button></h4>
              </div>}

            </div>
            {/* gems section  */}
            <div className="gems flex flex-col gap-[5px]">
                {gems.length>=1 && <h3 className='font-[500] text-[14px]'>Gems</h3>}
                
                {/* gem 01 */}
                {gems  && !moreGemsClicked &&
                    gems.map((gemItem,index)=>(
                    index<3?<Gems title={gemItem.title} backColor={gemItem.backColor} icon={gemItem.icon}/>:""
                    
              ))}
              
              {gems  && moreGemsClicked &&
                    gems.map((gemItem,index)=>(
                    <Gems title={gemItem.title} backColor={gemItem.backColor} icon={gemItem.icon}/>
                    
              ))}

                {/* more gems option  */}
                {moreThan3Gems && !moreGemsClicked && <div className='flex  hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[10px]'>
                <div className="p-[4px] rounded-[50px] border border-[#00000000]">

                <img src="/down.png" alt="more-options-icon" className="w-[15px]" />
                </div>


                <h4 className='text-[13px] text-[#575b5f]'><button onClick={changeMoreGem} className='cursor-pointer'>More</button></h4>
              </div>}

              {moreThan3Gems && moreGemsClicked && <div className='flex cursor-pointer hover:bg-[#cecece3d]  items-center p-[7px_6px] rounded-[40px] gap-[10px]'>
                <div className="p-[4px] rounded-[50px] border border-[#00000000]">

                <img src="../public/up-arrow.png" alt="more-options-icon" className="w-[9px]" />
                </div>


                <h4 className='text-[13px] text-[#575b5f]'><button onClick={changeMoreGem} className='cursor-pointer'>Less</button></h4>
              </div>}


            </div>
          </div>
          }
          
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
                  <button className='z-99999 cursor-pointer flex items-center text-[12px] font-[500] rounded-[6px] p-[8px] pl-6 pr-5 gap-2 bg-[#dde3ea]'><img src="../gemini-color.svg" alt="gemini-icon"/> Try Gemini Advanced</button>
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
              <div ref={scrollIt} className="chatArea  w-[65%] h-[80%]  relative overflow-y-auto overflow-x-hidden scrollbar-hide">

                {/* user message */}
                {/* <UserPrompt prompt={"Hi I am the message"}/> */}

                {/* bot reply  */}
                {/* <BotReply reply={'Hello \"the message\"! It\'s nice to meet you. Is there anything I can help you with today?'}/> */}
                

                {
                 currentChats && 
                 currentChats.map((current)=>(
                    <>
                     {/* {
                        scrollIt.current.scrollTo({
                          top: 1000,
                          behavior: 'smooth'
                        })
                      } */}
                      <UserPrompt prompt={current.user}/>
                      
                      <BotReply reply={current.bot}/>
                     
                    </>
                  ))
                }

                {
                  useChats && 
                  useChats.map((userText)=>(
                    <UserPrompt prompt={userText}/>

                  ))

                }
                {gotResponse && 
                  <>
                    <div className='flex items-start gap-[20px] mt-[80px] mb-[30px]'>
                                  <div className='flex-shrink-0'> 
                                    <img src="../gemini-color.svg" className='w-[25px]' alt="" />
                                  </div>
                                  <div className='flex flex-col gap-[15px]'>
                                    <div>
                                      <h3 className='text-[#575b5f] text-[15px] animate-fade-in'>
                                      Generating Response....
                                    </h3>
                                    </div>
                                  </div>
                                </div>
                    </>
                
                }

                {!chatStarted && <div className=' w-[100%] h-[88%] flex items-center justify-center'>
                  <h3 className='text-[1.95rem] select-none font-[500] bg-gradient-to-r from-blue-500 to-red-500 bg-clip-text text-transparent'>Hello, Muhammad Zain</h3>
                </div>}
               
              </div>

              <div className="prompt-box z-99999 bg-[white] border w-[64%] h-[16%] border-[#d3d3d3]  bottom-0 left-25 rounded-[26px] p-[10px_24px] flex flex-col gap-[8px]">
                {/* <input type="text"/> */}
                <textarea onChange={newPromptVal} onKeyDown={sendPrompt} className='w-[100%] h-auto outline-none resize-none' placeholder='Ask Gemini' value={promptState}></textarea>

                <div className='flex justify-between'>
                  <div className='flex gap-[16px]'>
                      <button><img src="./plus.png" className='w-[12px]' alt="" /></button>
                      <button className='flex gap-[5px] text-[15px] items-center`'><img src="./writing.png" className='w-[12px] object-contain' alt="" />Canvas</button>
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
