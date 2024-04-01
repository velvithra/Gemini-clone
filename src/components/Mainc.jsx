import './main.css'
import { assets } from '../assets/assets'
import { useContext } from 'react'
import { Context } from '../context/Context'


const Mainc = () => {
   const {onSent,recentSearch,showResult,loading,resultData,setInput,input}=useContext(Context);

  return (
    <div className='mainc'>
      <div className="nav">
        <p>Gemini</p>
        <img src={assets.user_icon} alt="" />
      </div>

      <div className='main-contain'>

        {!showResult
        ?<> 
        <div className="greet">
        <p><span>Hello, John</span></p>
        <p>How can I help you?</p>
      </div>
      <div className="cards">
      <div className="main-card ideas">
        <p>Ideas that drive generation</p>
        <img src={assets.bulb_icon} alt="" />
        </div>
        <div className="main-card places">
        <p>show me best places </p>
        <img src={assets.location_icon} alt="" />
        </div>
        <div className="main-card question">
        <p> What is law of attraction?</p>
        <img src={assets.question_icon} alt="" />
        </div>
        <div className="main-card question">
        <p>lets code...</p>
        <img src={assets.code_icon} alt="" />
        </div>
        </div>
        </>
        :
        <div className='result'>
          <div className="result-title">
            <img src={assets.user_icon} alt="" />
            <p>{recentSearch}</p>
          </div>
          <div className="result-data">
            <img src={assets.gemini_icon} alt="" />
            {loading
             ?
             <div className='loader'>
                <hr />
                <hr />
                <hr />
              </div>
              : 
              <p dangerouslySetInnerHTML={{__html:resultData}}></p>
              }
          </div> 
        </div>
        }

          <div className="main-bottom">
            <div className="search-box">
              <input onChange={(e)=>setInput(e.target.value)} value={input}type="text" placeholder="search here"/>
              <div>
              <img src={assets.mic_icon} alt=""/>
              <img onClick={()=>onSent()}src={assets.send_icon} alt=""/>
              </div>
            </div>
            <p className="disclaimer">
              Gemini may display inaccurate info,so double-check its responses.
            </p>
          </div>
    </div>
    </div>
  )
}
export default Mainc
