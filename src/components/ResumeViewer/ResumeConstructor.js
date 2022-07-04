import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, SectionType, TextRun } from 'docx'
import { saveAs } from 'file-saver'

export default function resumeConstructor(resume) {
    const { personal, statement, skills, projects, workHistory, education } = resume

    //will need to include some sort of algorithmic scoring logic for each line within the docx.
    //alert('in resume constructor')
    console.log('Constructing from... ' , personal, statement, skills, projects, workHistory, education)
    const sectPersonal = {
        properties: {
            page: {
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in',
                },
            },
            type: SectionType.CONTINUOUS,
        },
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
        properties: {
            page: {
                margin: {
                    top: '0.5in',
                    right: '0.5in',
                    bottom: '0.5in',
                    left: '0.5in',
                },
            },
            type: SectionType.CONTINUOUS,
        },
        children:[
            new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        text:statement.title,
                        size:48,
                        bold:true,
                        color: '009dff',
                        break:2,
                    }),
                    new TextRun({
                        text:statement.body,
                        size:24,
                        break:1,
                    })
                ]
            })
        ]
    }

    const sectSkills = {
        properties: {}
    }

    const sectProjects = {
        properties: {}
    }

    const sectWorkHistory = {
        properties: {}
    }

    const sectEducation = {
        properties: {}
    }



    const doc = new Document({
        
        sections: [ sectPersonal, sectStatement]
    })
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'blob.docx')
        console.log('Document created')
    })
}