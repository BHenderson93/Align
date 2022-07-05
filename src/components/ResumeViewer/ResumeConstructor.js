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

    const SUBHEADER = (subheaderText , dateStart, dateEnd) =>{
        return new Paragraph({
            alignment: AlignmentType.LEFT,
            children:[
                new TextRun({
                    text: subheaderText,
                    size: 28,
                    bold: true,
                }),
                /////put math in here to align dates and paragraph on same line.
                new TextRun({
                    text: `${dateStart}-${dateEnd}`,
                    size: 28,
                })
            ]
        })
    }

    const BULLET = (bodyText) =>{
        return new Paragraph({
            children:[
                new TextRun({
                    text:bodyText,
                    size:24,
                })
            ],
            bullet:{
                level:0
            }
        })
    }

    const createSectionSubSections = (section)=>{
        let output = [HEADER(section.header)]

        for(let subsect of section.subsections){
            output.push(SUBHEADER(subsect.subheader, subsect.dateStart, subsect.dateEnd))
            subsect.lines.forEach((line)=>output.push(BULLET(line.body)))
        }

        return output
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
            HEADER(statement.header), 
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
            HEADER(skills.header),
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
        properties: PROPERTIES,
        children: createSectionSubSections(projects)
    }

    const sectWorkHistory = {
        properties: PROPERTIES,
        children: createSectionSubSections(workHistory)
    }

    const sectEducation = {
        properties: PROPERTIES,
        children: createSectionSubSections(education)
    }



    const doc = new Document({

        sections: [sectPersonal, sectStatement , sectSkills , sectProjects, sectWorkHistory , sectEducation]
    })
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'blob.docx')
        console.log('Document created')
    })
}