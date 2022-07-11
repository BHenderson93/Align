import { AlignmentType, Document, TabStop, HeadingLevel, Packer, Paragraph, SectionType, maxRightTabStop, TabStopType, TextRun, TabStopPosition } from 'docx'
import { saveAs } from 'file-saver'

export default function resumeConstructor(resume , name) {
    const { personal, statement, skills, projects, workHistory, education } = resume

    //will need to include some sort of algorithmic scoring logic for each line within the docx.
    //alert('in resume constructor')

    //console.log('Constructing from... ', personal, statement, skills, projects, workHistory, education)
    const lineSpacing = {
        before:0,
        after:0,
        line:220,
    }
    const PROPERTIES = {
        page: {
            margin: {
                top: '0.5in',
                right: '0.5in',
                bottom: '0.5in',
                left: '0.5in',
            },
            size: {
                width: '8.5in',
                height: '11in'
            }
        },
    }

    const HEADER = (headerText, alignment) => {
        return new Paragraph({
            alignment: alignment,
            children: [
                new TextRun({
                    font: 'Garamond',
                    text: headerText.toUpperCase(),
                    size: 24,
                    bold: true,
                    color: '76a5af',
                })
            ],spacing:lineSpacing
        })
    }

    const SUBHEADER = (subheaderText, dateStart, dateEnd) => {

        console.log('my dateStart, dateEnd is ', dateStart, dateEnd)
        let dateText = ''

        const monthMap = {
            '01': 'Jan',
            '02': 'Feb',
            '03': 'Mar',
            '04': 'Apr',
            '05': 'May',
            '06': 'Jun',
            '07': 'Jul',
            '08': 'Aug',
            '09': 'Sep',
            '10': 'Oct',
            '11': 'Nov',
            '12': 'Dec'
        }

        //console.log('converted date format start, end is ' , `${monthMap[dateStart.slice(5,7)]} ${dateStart.slice(0,4)}` , `${monthMap[dateEnd.slice(5,7)]} ${dateEnd.slice(0,4)}` )

        if (dateStart) {
            dateText += `\t${monthMap[dateStart.slice(5, 7)]} ${dateStart.slice(0, 4)}`
            if (dateEnd) {
                dateText += `-${monthMap[dateEnd.slice(5, 7)]} ${dateEnd.slice(0, 4)}`
            }
        } else if (dateEnd) {
            dateText += `\t${monthMap[dateEnd.slice(5, 7)]} ${dateEnd.slice(0, 4)}`
        } else {
            dateText = ''
        }

        //dateEnd && dateStart? dateText=`\t${dateStart}-${dateEnd}`: dateStart? dateText=`\t${dateStart}`: dateEnd?dateText=`\t${dateEnd}`:dateText=''
        return new Paragraph({
            alignment: AlignmentType.LEFT,
            children: [
                new TextRun({
                    font: 'Garamond',
                    text: subheaderText,
                    size: 24,
                    bold: true,
                }),
                /////put math in here to align dates and paragraph on same line.
                new TextRun({
                    font: 'Garamond',
                    text: dateText,
                    size: 22,
                }),
            ],
            tabStops: [{
                type: TabStopType.RIGHT,
                position: '7.4in'
            }],
            spacing:lineSpacing
        })
    }

    const BULLET = (bodyText) => {
        return new Paragraph({
            children: [
                new TextRun({
                    font: 'Garamond',
                    text: bodyText,
                    size: 22,
                })
            ],
            bullet: {
                level: 0
            },
            spacing:lineSpacing
        })
    }

    const SPACER = new TextRun({
        font: 'Garamond',
        text: '',
        size: 14,
        break: 1,
    })

    const PARASPACER = new Paragraph({
        children: [
            new TextRun({
                font: 'Garamond',
                text: '',
                size: 14,
            })
        ],
        spacing:lineSpacing
    })

    const MICROSPACER = new TextRun({
        font: 'Garamond',
        text: '',
        size: 4,
        break: 1,
    })

    const createSectionSubSections = (section) => {
        let output = [HEADER(section.header, AlignmentType.LEFT)]

        for (let subsect of section.subSections) {
            output.push(SUBHEADER(subsect.subHeader, subsect.dateStart, subsect.dateEnd))
            subsect.lineItems.forEach((line) => output.push(BULLET(line.body)))
            output.push(PARASPACER)
        }
        //console.log('my output is ' , output)
        return output
    }

    const sectPersonal = {
        properties: PROPERTIES,
        children: [
            new Paragraph({
                spacing:lineSpacing,
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        font: 'Garamond',
                        text: personal.name,
                        size: 56,
                        bold: true,
                        color: '76a5af',
                    }),
                    MICROSPACER,
                    new TextRun({
                        font: 'Garamond',
                        text: `${personal.email} | ${personal.phone}`,
                        size: 22,
                    }),
                    new TextRun({
                        font: 'Garamond',
                        text: `${personal.link1 ? `${personal.link1}` : ''}${personal.link2 ? `${' | ' + personal.link2}` : ''}${personal.link3 ? `${' | ' + personal.link3}` : ''}`,
                        size: 22,
                        break: 1,
                    }),
                    SPACER
                ]
            })
        ]
    }

    const sectStatement = {
        properties: PROPERTIES,
        children: [
            HEADER(statement.header, AlignmentType.CENTER),
            new Paragraph({
                spacing: lineSpacing,
                alignment: AlignmentType.LEFT,
                children: [
                    new TextRun({
                        font: 'Garamond',
                        text: statement.body,
                        size: 22,
                        break: 0,
                    }),
                    SPACER
                ]
            })
        ]
    }

    const sectSkills = {
        properties: PROPERTIES,
        children: [
            HEADER('Skills and Expertise', AlignmentType.CENTER),
            new Paragraph({
                spacing:lineSpacing,
                alignment: AlignmentType.CENTER,
                children: [
                    new TextRun({
                        font: 'Garamond',
                        text: skills.map((sk) => sk.skill).join(' | '),
                        size: 22,
                    }),
                    SPACER
                ]
            })
        ]
    }

    const sectProjects = {
        properties: PROPERTIES,
        children: createSectionSubSections(projects),
        spacing: lineSpacing,
    }

    const sectWorkHistory = {
        properties: PROPERTIES,
        children: createSectionSubSections(workHistory),
        spacing:lineSpacing,
    }

    const sectEducation = {
        properties: PROPERTIES,
        children: createSectionSubSections(education),
        spacing:lineSpacing,
    }

    //order by date
    sectProjects.children.sort(function(a,b){
        return b.dateEnd - a.dateEnd
    })
    sectWorkHistory.children.sort(function(a,b){
        return b.dateEnd - a.dateEnd
    })

    const docUnifier = {
        properties: PROPERTIES,
        children: [...sectPersonal.children, ...sectStatement.children, ...sectSkills.children, ...sectProjects.children, ...sectWorkHistory.children, ...sectEducation.children]
    }
    const doc = new Document({
        creator: 'Align',
        description: 'A beautiful (hopefully) Align optimized resume.',
        title: 'My Resume',
        sections: [docUnifier]
    })

    console.log('this doc is ', doc)

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `${name}.docx`)
        console.log('Document created')
    })
}