import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { jsPDF } from "jspdf";

const Result = () => {
  const navigate = useNavigate();
  const [markdownText, setMarkdownText] = useState("");
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const generatePDFForPremiumUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        navigate("/login");
        return;
      }

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists() || userSnap.data().isPremium == false) {
        alert("Please purchase the report to download.");
        navigate("/pricing");
        return;
      } else {
        console.log(userSnap.data().isPremium);
        try {
          const markdown = localStorage.getItem("suggestions");
          if (!markdown) {
            alert("No result found to generate PDF.");
            return;
          }

          setMarkdownText(markdown); // Set for preview

          let user_name = user.displayName?.replaceAll(" ", "_") || "User";
          const pdfDoc = new jsPDF();
          const pageWidth = pdfDoc.internal.pageSize.getWidth();
          const margin = 10;
          const maxLineWidth = pageWidth - margin * 2;
          let y = 20;

          const lines = markdown.split("\n");

          lines.forEach((line) => {
            let fontSize = 12;
            let textStyle = "normal";
            let indent = 0;
            let processedText = line;

            if (line.startsWith("# ")) {
              fontSize = 20;
              textStyle = "bold";
              processedText = line.replace("# ", "");
            } else if (line.startsWith("## ")) {
              fontSize = 18;
              textStyle = "bold";
              processedText = line.replace("## ", "");
            } else if (/^\*\*(.+)\*\*$/.test(line.trim())) {
              fontSize = 14;
              textStyle = "bold";
              processedText = line.trim().replace(/^\*\*(.+)\*\*$/, "$1");
            } else if (line.startsWith("- ")) {
              fontSize = 12;
              textStyle = "normal";
              processedText = line.replace("- ", "");
              indent = 2;
            }

            pdfDoc.setFontSize(fontSize);
            pdfDoc.setFont("helvetica", textStyle);

            if (y > pdfDoc.internal.pageSize.getHeight() - 20) {
              pdfDoc.addPage();
              y = 20;
            }

            if (line.startsWith("- ")) {
              pdfDoc.text("•", margin + indent, y);
              indent += 5;
            }

            if (processedText.trim() !== "") {
              const textLines = pdfDoc.splitTextToSize(
                processedText,
                maxLineWidth - indent
              );
              pdfDoc.text(textLines, margin + indent, y);
              y += 8 * textLines.length;
            } else {
              y += 4;
            }

            if (line.startsWith("# ") || line.startsWith("## ")) {
              y += 4;
            }
          });

          pdfDoc.save(`${user_name}_Career_Suggestion.pdf`);

          await setDoc(doc(db, "pdfResults", user.uid), { markdownText: markdown });
          alert("PDF result saved to Firestore.");
          localStorage.removeItem("suggestions");
        } catch (err) {
          console.error("Error generating PDF:", err);
          alert("Failed to generate PDF.");
        }
      }
    };

    generatePDFForPremiumUser();
  }, [navigate]);

  const previewText = showMore ? markdownText : markdownText.split("\n").slice(0, 10).join("\n");

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold mb-4">Generating your career report...</h1>
      <p className="text-gray-600 mb-6">
        Your PDF download should begin shortly. If it doesn't, please check your browser's pop-up settings.
      </p>

      {markdownText && (
        <div className="max-w-4xl mx-auto text-left bg-white border rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-2 text-center">Career Report Preview</h2>
          <pre className="whitespace-pre-wrap text-sm text-gray-800 mb-2">
            {previewText}
          </pre>
          {markdownText.split("\n").length > 10 && (
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 hover:underline text-sm"
            >
              {showMore ? "Show Less" : "Show More"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Result;
