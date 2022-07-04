import { AlignmentType, Document, HeadingLevel, Packer, Paragraph, SectionType, TextRun } from 'docx'
import { saveAs } from 'file-saver'

export default function resumeConstructor(resume) {
    const { personal, statement, skills, projects, workHistory, education } = resume

    //will need to include some sort of algorithmic scoring logic for each line within the docx.
    //alert('in resume constructor')

    const sectPersonal =
        new Paragraph({
            children: [
                new TextRun({
                    text: personal.name,
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER
                }),
                new TextRun({
                    text: `${personal.email}        ||        ${personal.phone}`,
                    alignment: AlignmentType.CENTER
                }),
/*                 new TextRun({
                    text: `${personal.name}`,
                    alignment: AlignmentType.CENTER
                }) */

            ]
        })

    const sectStatement = {
        properties: {}
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
        properties: {
            type: SectionType.CONTINUOUS
        },
        sections: [
            {
                children: [
                    sectPersonal
                ]
            }]
    })
    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, 'blob.docx')
        console.log('Document created')
    })
}