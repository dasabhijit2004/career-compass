import React from "react";
import { jsPDF } from "jspdf";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const MarkdownToPDF = () => {
  const markdownText = `${localStorage.getItem("suggestions")}`;
  console.log(typeof localStorage.getItem("suggestions"));
  const navigate = useNavigate();
  const downloadPDF = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        console.log("current user: ",user);
        let user_name = user.displayName.replaceAll(' ','_');
        const pdfDoc = new jsPDF();
        const pageWidth = pdfDoc.internal.pageSize.getWidth();
        const margin = 10;
        const maxLineWidth = pageWidth - margin * 2;
        let y = 20;

        const lines = markdownText.split("\n");

        lines.forEach((line) => {
          let fontSize = 12;
          let textStyle = "normal";
          let indent = 0;
          let processedText = line;

          // Process different markdown styles
          if (line.startsWith("# ")) {
            fontSize = 20;
            textStyle = "bold";
            processedText = line.replace("# ", "");
          } else if (line.startsWith("## ")) {
            fontSize = 18;
            textStyle = "bold";
            processedText = line.replace("## ", "");
          } else if (line.startsWith("**") && line.endsWith("**")) {
            fontSize = 14;
            textStyle = "bold";
            processedText = line.replace(/^\*\*|\*\*$/g, "");
          } else if (line.startsWith("- ")) {
            fontSize = 12;
            textStyle = "normal";
            processedText = line.replace("- ", "");
            indent = 2;
          }

          // Set font settings
          pdfDoc.setFontSize(fontSize);
          pdfDoc.setFont("helvetica", textStyle);

          // Check if we need a new page
          if (y > pdfDoc.internal.pageSize.getHeight() - 20) {
            pdfDoc.addPage();
            y = 20;
          }

          // Handle bullet points
          if (line.startsWith("- ")) {
            pdfDoc.text("•", margin + indent, y);
            indent += 5;
          }

          // Split text to handle wrapping
          if (processedText.trim() !== "") {
            const textLines = pdfDoc.splitTextToSize(
              processedText,
              maxLineWidth - indent
            );
            pdfDoc.text(textLines, margin + indent, y);
            y += 8 * textLines.length; // Increase y position based on number of wrapped lines
          } else {
            y += 4; // Small space for empty lines
          }

          // Add a bit of extra spacing after headings
          if (line.startsWith("# ") || line.startsWith("## ")) {
            y += 4;
          }
        });

        pdfDoc.save(user_name+"_Career_Suggestion.pdf");

        await setDoc(doc(db, "pdfResults", user.uid), { markdownText });
        alert("PDF result saved to Firestore.");
        localStorage.removeItem("suggestions");
      } else {
        alert("User not logged in.");
        navigate("../login");
        
      }
    } catch (error) {
      console.error("Error saving PDF to Firestore:", error);
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
        <pre className="whitespace-pre-wrap">{markdownText}</pre>
      </div>
    </div>
  );
};

export default MarkdownToPDF;
