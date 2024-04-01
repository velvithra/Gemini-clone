import { createContext, useState } from "react";
import runChat from "../config/Gemini";
import PropTypes from 'prop-types';

export const Context=createContext();

const ContextProvider=(props)=>{
    
    const[input,setInput]=useState("");
    const[recentSearch,setRecentSearch]=useState("");
    const[previousSearch,setPreviousSearch]=useState([]);
    const[showResult,setShowResult]=useState(false);
    const[loading,setLoading]=useState(false);
    const[resultData,setResultData]=useState("");
    
    const delayPara=(index,nextWord)=>{
         setTimeout(function(){
            setResultData(prev=>prev+nextWord);
         },75*index)
    }

    const newChat=()=>{
        setLoading(false);
        setShowResult(false);
    }

    const onSent=async(prompt)=>{
        setResultData("");
        setLoading(true);
        setShowResult(true)
        let response;
        if(prompt !== undefined){
             response = await runChat(prompt);
             setRecentSearch(prompt);
        }
        else
        {
            setPreviousSearch(prev=>[...prev,input]);
            setRecentSearch(input);
            response = await runChat(input);
        }
        let responseArray= response.split("**");
        let newResponse="";
        for(let i=0; i < responseArray.length; i++){
            if(i ===0 || i%2 !==1){
                   newResponse +=responseArray[i];
            }
            else{
                newResponse +="<b>" +responseArray[i]+ "</b>";
            }
        }
        let newResponse1=newResponse.split("*").join("<br>");
        let newResponseArray= newResponse1.split(" ");
        for(let i=0; i <newResponseArray.length; i++){
            const nextWord=newResponseArray[i];
            delayPara(i,nextWord+" ");
        }
        setLoading(false);
        setInput("");
    }
   
    const contextValue={
        previousSearch,
        setPreviousSearch,
        onSent,
        recentSearch,
        setRecentSearch,
        showResult,
        setShowResult,
        loading,
        setLoading,
        resultData,
        setResultData,
        input,
        setInput,
        newChat
    }
    return(
        <Context.Provider  value={contextValue}>
           {props.children}
        </Context.Provider>
    )
}
    ContextProvider.propTypes = {
        children: PropTypes.any
    };
export default ContextProvider