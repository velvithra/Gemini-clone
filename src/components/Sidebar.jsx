import './sidebar.css'
import { assets } from '../assets/assets'
import { useContext, useState } from 'react'
import { Context } from '../context/Context';

const Sidebar = () => {

    const[extend,setExtend]=useState(false);
    const{onSent,previousSearch,setRecentSearch,newChat}=useContext(Context);
    
    const  loadSearch=async (prompt)=>{
      setRecentSearch(prompt)
      await onSent(prompt)
    }
  return (
    <div className="side-bar">
        <div className='top'>
            <img onClick={()=>setExtend(prev=>!prev)}className='menu' src={assets.menu_icon} alt=""/>
            <div onClick={()=>newChat()}className="new-chat">
                <img src={assets.plus_icon} alt="" />
               {extend? <p>New Chat</p>:null}
            </div>
            {extend
            ? <div className="recent-chat">
            <p className='recent-title'>Recent</p>
            {
            previousSearch.map((item)=>{
               return (<>
                <div onClick={()=>loadSearch(item)} className="recent-entry">
                <img src={assets.message_icon} alt="" />
                <p>{item.slice(0,16)}...</p>
                </div>
                </>  ) 
            })}
           
            </div>:null}
        </div>
       
        <div className='bottom'>
            <div className="bottom-item recent-entry">
            <img src={assets.question_icon} alt=""/>
          {extend?<p>Help</p>:null}  
            </div>
            <div className="bottom-item recent-entry">
            <img src={assets.history_icon} alt=""/>
            {extend?<p>History</p>:null} 
            </div>
            <div className="bottom-item recent-entry">
            <img src={assets.setting_icon} alt=""/>
            {extend?<p>Settings</p>:null}  
            </div>
        </div>
    </div>
  )
}

export default Sidebar
