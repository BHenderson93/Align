import {React, useState} from 'react'
import resumeConstructor from './ResumeConstructor' 

const testData = {
  personal:{
    name:'Bryce Henderson',
    email:'PrettyPinkPrincess@CheezeSnail.yum',
    phone:'360-551-5555',
    link1:'gothub.com/bhenderson',
    link2:'Blinkedin.com/bhenderson',
    link3:'CornHub.com'
  },
  statement:{
    title:'Software Engineer',
    body:`This is my text body. It's a long body because I want to see the page breaks. I'm interested in a job as a software engineer and think that I would do well in that role. So far, I'm enjoying thinking through all these things and seeing my work pop up on a page. This is a long and pointless statement speckled with real thoughts because I'm just writing things so I can see how the text wraps. The end.`
  },
  skills:{
    title:'Skills',
    skills:['skill1' , 'skill2' , 'python' , 45 , 'Mongodb' , 'comedy' , 'textwrap case testing' , 'eating' , 'drinking' , 'breathing' , 'sleeping' , 'writing code' , 'procrastinating' , 'RESTful sleeping' , 'Routeful GETting' , 'API']
  },
  projects:null,
  workHistory:null,
  education:null
}

export default function ResumeViewer({section}) {
  const [contents , setContents] = useState(testData)

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
