
/* 
https://docx.js.org/#/usage/document -- notes

Documents are made of multiple sections.
Sections are groupings of paragraph with properties. Ex: Properties include page size, page numbers, page orientation, headers, borders and margins.


https://runkit.com/dolanmiu/docx-demo6

** it seems like I'll need a DB with 




General Schema
    One document has multiple sections. One section has children as multiple paragraphs. One paragraph has multiple children as Text/etc.

    const doc = new Document({
    sections: [{
        children: [
            new Paragraph({
                text: "Bullet points",
                bullet: {
                    level: 0 // How deep you want the bullet to be. Maximum level is 9
                }
            }),
            new Paragraph({
                text: "Are awesome",
                bullet: {
                    level: 0
                }
            })
        ],
    }];
});

https://docx.js.org/#/usage/styling-with-js

https://developers.google.com/drive/api/guides/about-sdk  -- or could we just provide downloadable doc and store the resume's section scores?

*/