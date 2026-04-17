import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { CVData } from '../types';

export const exportToDocx = async (data: CVData) => {
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            text: data.personalInfo.fullName,
            heading: HeadingLevel.HEADING_1,
            alignment: AlignmentType.CENTER,
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun(`${data.personalInfo.email} | ${data.personalInfo.phone}`),
              new TextRun({
                text: `\n${data.personalInfo.location} | ${data.personalInfo.jobTitle}`,
                break: 1,
              }),
            ],
          }),
          
          new Paragraph({ text: '', spacing: { after: 200 } }),
          
          new Paragraph({
            text: 'Riepilogo Professionale',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
          }),
          new Paragraph({ text: data.personalInfo.summary, spacing: { before: 100, after: 200 } }),

          new Paragraph({
            text: 'Esperienza Lavorativa',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
          }),
          ...data.experiences.flatMap((exp) => [
            new Paragraph({
              children: [
                new TextRun({ text: exp.position, bold: true }),
                new TextRun({ text: ` | ${exp.company}`, italic: true }),
              ],
              spacing: { before: 150 },
            }),
            new Paragraph({
              text: `${exp.startDate} - ${exp.endDate}`,
              spacing: { after: 100 },
            }),
            new Paragraph({ text: exp.description, spacing: { after: 150 } }),
          ]),

          new Paragraph({
            text: 'Istruzione e Formazione',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
          }),
          ...data.educations.flatMap((edu) => [
            new Paragraph({
              children: [
                new TextRun({ text: edu.degree, bold: true }),
                new TextRun({ text: ` | ${edu.school}`, italic: true }),
              ],
              spacing: { before: 150 },
            }),
            new Paragraph({
              text: `${edu.startDate} - ${edu.endDate}`,
              spacing: { after: 100 },
            }),
            new Paragraph({ text: edu.description, spacing: { after: 150 } }),
          ]),

          new Paragraph({
            text: 'Competenze',
            heading: HeadingLevel.HEADING_2,
            border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
          }),
          new Paragraph({
            text: data.skills.join(', '),
            spacing: { before: 100, after: 200 },
          }),

          ...(data.certifications.length > 0 ? [
            new Paragraph({
              text: 'Certificazioni',
              heading: HeadingLevel.HEADING_2,
              border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
            }),
            ...data.certifications.flatMap((cert) => [
              new Paragraph({
                children: [
                  new TextRun({ text: cert.name, bold: true }),
                  new TextRun({ text: ` - ${cert.issuer}`, italic: true }),
                  new TextRun({ text: ` (${cert.date})` }),
                ],
                spacing: { before: 100, after: 100 },
              }),
            ]),
          ] : []),

          ...(data.languages.length > 0 ? [
            new Paragraph({
              text: 'Lingue',
              heading: HeadingLevel.HEADING_2,
              border: { bottom: { color: 'auto', space: 1, value: 'single', size: 6 } },
            }),
            new Paragraph({
              text: data.languages.map(l => `${l.name} (${l.level})`).join(', '),
              spacing: { before: 100, after: 200 },
            }),
          ] : []),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `${data.personalInfo.fullName.replace(/\s+/g, '_')}_CV.docx`);
};
