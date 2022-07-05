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
    header:'Software Engineer',
    body:`This is my text body. It's a long body because I want to see the page breaks. I'm interested in a job as a software engineer and think that I would do well in that role. So far, I'm enjoying thinking through all these things and seeing my work pop up on a page. This is a long and pointless statement speckled with real thoughts because I'm just writing things so I can see how the text wraps. The end.`
  },
  skills:{
    header:'Skills',
    skills:['skill1' , 'skill2' , 'python' , 45 , 'Mongodb' , 'comedy' , 'textwrap case testing' , 'eating' , 'drinking' , 'breathing' , 'sleeping' , 'writing code' , 'procrastinating' , 'RESTful sleeping' , 'Routeful GETting' , 'API']
  },
  projects:{
    header:'Projects',
    subsections:[
      {
        subheader:'Software Engineering Apprentice at General Assembly',
        dateStart:'Jun 2022',
        dateEnd:'Jun 2022',
        lines:[
          {body:'Created fun JavaScript game.'},
          {body:'Used HTML and CSS for display.'},
          {body:'Accepted realtime player inputs to control circle.'},
          {body:'Designed player-tracking logic for evil squares.'}
        ]

      },{
        subheader:'Time Travel Tour Guide',
        dateStart:'Jan 1901',
        dateEnd:'Dec 2101',
        lines:[
          {body:'Traveled in time to tickle a walrus with rich sponsors.'},
          {body:'Was impaled and had to give up on mission early. 4 others dead.'},
          {body:'Start date is actually date of walrus tickling, while end date was start date of journey.'}
        ]
      }
    ]
  },
  workHistory:{
    header:'Work History',
    subsections:[
      {
        subheader:'Pan Handler',
        dateStart:'May 2022',
        dateEnd:'Present',
        lines:[
          {body:'Handled pans.'},
          {body:'Occasionally handled pots, despite not being in the job description.'}
        ]
      },
      {
        subheader:'Software Engineer at Google',
        dateStart:'May 2016',
        dateEnd:'May 2022',
        lines:[
          {body:'Left job to pursue passion of pan handling.'},
          {body:'Optimized code and produced $10B in new revenue.'}
        ]
      }
    ]
  },
  education:{
    header:'Education',
    subsections:[
      {
        subheader:'Bachelors of Science in Trying Hard - Harvard',
        dateStart:'Aug 2012',
        dateEnd:'May 2022',
        lines:[
          {body:'Tried very, very hard.'},
          {body:'Occasionally received pat on head.'}
        ]
      },
      {
        subheader:'Software Engineering Certificate - General Assembly',
        dateStart:'May 2022',
        dateEnd:'Aug 2022',
        lines:[
          {body:'Spent over 419 hours in class studying SWE.'},
          {body:'By the end, could center a div using position:fixed and turn it red with background:RGB(0,65,65)'}
        ]
      }
    ]
  }
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