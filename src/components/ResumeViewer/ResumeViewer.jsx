//need to add sectionContents to construction page state - to hold sectional inputs.
/* 

Construction page:
  const [resumeContents , setResumeContents] = useState({
    personal:null,
    statement:null,
    skills:null,
    projects:null,
    workHistory:null,
    education:null


Resume Viewer States 1: **Create section feeds these into Resume Viewer one at a time**

const [sectionContents , setSectionContents] = useState({
    name:{type:String , required:true , min:2 , max:30},
    email:{type:String , required: true},
    phone:{type:String , required:true},
    link1:{type:String , required:false},
    link2:{type:String , required:false},
    link3:{type:String , required:false}
})

RV States 2:
    title:{type:String, required:false , min:3, max:50},
    body:{type:String , required:false , min:[10,'Min char length is 10.'] , max:[300 , 'Max char length is 300.'] }



*/


import {React, useState} from 'react'
import resumeConstructor from './ResumeConstructor' 


export default function ResumeViewer({section}) {
  const [contents , setContents] = useState({
    personal:{
      name:'Bryce Henderson',
      email: 'PrettyPinkPrincess@Cheezemail.net',
      phone:'360-551-5555'
    },
    statement:null,
    skills:null,
    projects:null,
    workHistory:null,
    education:null
  })

  function handleClick(){
    resumeConstructor(contents)
  }

  return (
    <div className='h-96 bg-gray-400 p-8 border border-2 border-black w-96'>
      <h1>{section}</h1>
      <button onClick={handleClick}>Download Resume</button>
    </div>
  )
}
