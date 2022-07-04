import * as docx from 'docx'
import * as fs from 'fs'

console.log('seeing js for docx test')

function generateDocx(){
    console.log('starting function generateDocx')
    const doc = new docx.Document({
        creator: "Bryce Henderson",
        description: "My extremely interesting Resume Builder",
        title: "Resume_XYZ",
        sections: [{
            properties: {},
            children: [
                new TextRun("HELLO"),
                new TextRun({
                    text: "we're doing this thing.",
                    bold: true
                })
            ]
        }]
    });
    
    docx.Packer.toBuffer(doc).then((buffer)=>{
        console.log(buffer)
        saveAs(buffer, 'myResume.docx')
    })

}

