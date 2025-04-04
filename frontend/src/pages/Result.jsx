import React from 'react';
import { jsPDF } from 'jspdf';
import { doc, setDoc } from 'firebase/firestore';
import { db, auth } from '../firebase';

const MarkdownToPDF = () => {
  const markdownText = `# Sample Markdown\n\n## Subheading\n\n**This is a bold text**\n\n- Item 1\n- Item 2\n- Item 3\n\n[Visit OpenAI](https://www.openai.com)`;

  const downloadPDF = async () => {
    // Renamed the jsPDF instance to pdfDoc
    const pdfDoc = new jsPDF();
    const lines = markdownText.split('\n');
    let y = 10;

    lines.forEach((line) => {
      if (line.startsWith('# ')) {
        pdfDoc.setFontSize(20);
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.text(line.replace('# ', ''), 10, y);
      } else if (line.startsWith('## ')) {
        pdfDoc.setFontSize(18);
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.text(line.replace('## ', ''), 10, y);
      } else if (line.startsWith('**')) {
        pdfDoc.setFontSize(14);
        pdfDoc.setFont('helvetica', 'bold');
        pdfDoc.text(line.replace('**', '').replace('**', ''), 10, y);
      } else if (line.startsWith('- ')) {
        pdfDoc.setFontSize(12);
        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.text(`• ${line.replace('- ', '')}`, 12, y);
      } else {
        pdfDoc.setFontSize(12);
        pdfDoc.setFont('helvetica', 'normal');
        pdfDoc.text(line, 10, y);
      }
      y += 8;
    });

    pdfDoc.save('sample-markdown.pdf');

    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, 'pdfResults', user.uid), { markdownText });
        alert('PDF result saved to Firestore.');
      } else {
        alert('User not logged in.');
      }
    } catch (error) {
      console.error('Error saving PDF to Firestore:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Results</h1>
      <button
        className="px-6 py-2 rounded-md bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg"
        onClick={downloadPDF}
      >
        Download PDF
      </button>
      <div className="mt-8 p-4 bg-white rounded-md shadow-md w-full max-w-lg">
        <pre>{markdownText}</pre>
      </div>
    </div>
  );
};

export default MarkdownToPDF;
