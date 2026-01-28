import React, { useRef, useState } from 'react'
import './Quiz.css'
import { data } from '../../assets/data';

export const Quiz = () => {

    const [index,setIndex] = useState(0); 
    const [lock, setLock] = useState(false);
    const [score, setScore] = useState(0);
    const [result, setResult] = useState(false);
    const question= data[index]; 
    
    const option1 = useRef(null);
    const option2 = useRef(null);
    const option3 = useRef(null);
    const option4 = useRef(null);
    const option_array = [option1, option2, option3, option4];
    

    const checkAns = (e, ans) => {
        if(lock === false){
            if(question.ans ===ans){
                e.target.classList.add("correct");
                setScore(prev=>prev+1)
            }else{
                e.target.classList.add("wrong");
                option_array[question.ans-1].current.classList.add("correct");
            }
            setLock(true)
        }
    }
    const next = () =>{
        if(lock === true){
            if(index === data.length-1){
                setResult(true);
                return 0;
            }
            setIndex(prev=>prev+1);
            setLock(false);
            option_array.forEach((option)=>{
                option.current.classList.remove("wrong", "correct");
            })
        }
    }
    const reset = () =>{
        setIndex(0);
        setResult(false);
        setScore(0);
        setLock(false);
        option_array.forEach(option => {
            option.current.classList.remove("wrong", "correct");
        });
    }
  return (
    <div className='container'>
        <h1>Quiz APP</h1>
        <hr />
        {!result?(
        <>
            <h2>{index+1}. {question.question}</h2>
            <ul>
                <li ref={option1} onClick={(e)=>{checkAns(e,1)}}>{question.Option1}</li>
                <li ref={option2} onClick={(e)=>{checkAns(e,2)}}>{question.Option2}</li>
                <li ref={option3} onClick={(e)=>{checkAns(e,3)}}>{question.Option3}</li>
                <li ref={option4} onClick={(e)=>{checkAns(e,4)}}>{question.Option4}</li>
            </ul>
            <button onClick={next}>Next</button>
            <div className='index'>{index+1} of {data.length} container</div>
        </>
        ):(
        <>
            <h2>You Scored {score} out of {data.length}</h2>
            <button onClick={reset}>Reset</button> 
        </>
    )}
    </div>
  )
}
