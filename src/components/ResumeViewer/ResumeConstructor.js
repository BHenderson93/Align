import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, SectionType, TextRun } from 'docx'
import { saveAs } from 'file-saver'

export default function resumeConstructor(resume) {
    const { personal, statement, skills, projects, workHistory, education } = resume

    //will need to include some sort of algorithmic scoring logic for each line within the docx.
    //alert('in resume constructor')
    
    console.log('Constructing from... ', personal, statement, skills, projects, workHistory, education)
    
    const PROPERTIES = {
        page: {
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in',
            },
        },
        type: SectionType.CONTINUOUS,
    }

    const HEADER = (headerText) =>{
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children:[
                new TextRun({
                    text: headerText,
                    size: 48,
                    bold: true,
                    color: '009dff',
                    break: 1,
                })
            ]
        })
    }

    const SUBHEADER = (subheaderText) =>{
        return new Paragraph({
            alignment: AlignmentType.CENTER,
            children:[
                new TextRun({
                    text: subheaderText,
                    size: 36,
                    bold: true,
                    color: '009dff',
                    break: 1,
                })
            ]
        })
    }

    const BODY = (bodyText) =>{

    }

    const sectPersonal = {
        properties: PROPERTIES,
        children: [
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text: personal.name,
                        size: 72,
                        bold: true,
                        color: '009dff',
                    }),
                    new TextRun({
                        text: `${personal.email}        |        ${personal.phone}`,
                        size: 24,
                        break: 1,
                    }),
                    new TextRun({
                        text: `${personal.link1}    |    ${personal.link2}    |    ${personal.link3}`,
                        size: 24,
                        break: 1,
                    })
                ]
            })
        ]
    }

    const sectStatement = {
        properties:PROPERTIES,
        children: [
            HEADER(statement.title), 
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children:[
                    new TextRun({
                        text: statement.body,
                        size: 24,
                        break: 0,
                        color:'ff0000'
                    })
                ]
            })
        ]
    }

    const sectSkills = {
        properties: PROPERTIES,
        children:[
            HEADER(skills.title),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children:[
                    new TextRun({
                        text: skills.skills.join(' | '),
                        size: 24,
                        break: 0,
                        color:'ff0000'
                    })
                ]
            })
        ]
    }

    const sectProjects = {
        properties: PROPERTIES
    }

    const sectWorkHistory = {
        properties: PROPERTIES
    }

    const sectEducation = {
        properties: PROPERTIES
    }



    const doc = new Document({

        sections: [sectPersonal, sectStatement , sectSkills]
    })
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'blob.docx')
        console.log('Document created')
    })
}