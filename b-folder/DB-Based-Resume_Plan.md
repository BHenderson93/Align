

DB.find(user)

return user.resume

user.resume should be a list of sections.



const doc = new Document({

    sections:[{
        //my page options, such as margins 

        margins:{
            top:x,
            bottom:y,
        }
    },

        children:[
            new Paragraph({            //children are an array
                children:[ 
                    new Textrun({text:`${resume.name}`, size:42})
                    new Textrun({text:`${resume.contact}`, size:12})
                ]
        }), new Paragraph({

        }), new Paragraph({

        })
        ]
    ]
})

it looks like creating a resume object is the best. For example:

const resumeSchema = new Schema({
        personalData:{
            cond:{
                other condition:x,
                other condition: y
            },
            cont:{
                name: {type:String , required:true } 'Bryce Henderson'
                contact: 'email, phone'
                links:'linkedIn URL, github URL, portfolio URL'
            }
        },
        statement:{
            cond:{
                size? Maybe better as a virtual.
                contentEvaluation:false
            },
            cont:{
                sectionTitle: {type:String , default:'Personal Statement'},
                body: AAU Lorem ipsum.
            }
        },
        projects:{
            cond:{
                contentEvaluation:true,
                priority:10,
                minItems:1,
                maxItems:4
                minItemLines:2,
                maxItemLines:5
            },
            cont:{
                ith_item:{
                    title:'awesome project',
                    date_start:'nov 2022'
                    date_end: 'dec 2043'
                    lines:[
                        //is this an embedded schema?? Need max chars for space.
                        {body:'Used Javascript with MongoDB' , keywords:['javascript' , 'mongodb']},
                        {body:'Deployed via Heroku', keywords:['heroku']},
                        {body:'HTML, CSS, Python, for exceptional UX/UI' , keywords:['html','css','python','ux','ui'] },
                        {body:'other things',keywods:[], priority:XXX},
                        {body:'other things',keywods:[]},
                        {body:'other things',keywods:[]},
                        {body:'other things',keywods:[]},
                        {body:'other things',keywods:[]},
                        {body:'other things',keywods:[]},
                        {body:'other things',keywods:[]},
                    ]
                }
            }
        },
        experience:{
            cond:{
                contentEvaluation:true,
                priority:6,
                minItems:1,
                maxItems:4,
                minItemLines:2,
                maxItemLines:4
            },
            cont:{}
        },
        education:{
            cond:{},
            cont:{}
        }
})