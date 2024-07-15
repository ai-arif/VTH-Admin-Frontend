import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleDownloadTestResult = async (testResult) => {
  const doc = new jsPDF();
  // Extract owner information from appointment
  const ownerName = testResult?.appointmentId?.ownerName || "N/A";
  const caseNo = testResult?.appointmentId?.caseNo || "N/A";
  const phone = testResult?.appointmentId?.phone || "N/A";
  const upazila = testResult?.appointmentId?.upazila || "N/A";
  const address = testResult?.appointmentId?.address || "N/A";

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };
  const appointmentDate = formatDate(testResult?.appointmentId?.date);

  // Extract test result
  console.log(testResult?.data);

  // PDF HEADING & BODY
  // Add titles and border
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.text("VETERINARY TEACHING HOSPITAL", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Bangladesh Agriculture University, Mymensingh-2202", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(10, 35, doc.internal.pageSize.getWidth() - 10, 35);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Test Result", doc.internal.pageSize.getWidth() / 2, 45, { align: "center" });

  // Add owner and patient information justified between left and right sides
  doc.setFontSize(10);
  const leftColumnX = 10;
  const rightColumnX = doc.internal.pageSize.getWidth() / 2 + 40;
  const startY = 60;
  const lineSpacing = 10;
  const infoLineSpacing = 7;

  // Add owner information
  doc.text(`Case No: ${caseNo}`, leftColumnX, startY);
  doc.text(`Date: ${appointmentDate}`, rightColumnX, startY);

  doc.text(`Owner Name: ${ownerName}`, leftColumnX, startY + infoLineSpacing);
  doc.text(`Upazila: ${upazila}`, rightColumnX, startY + infoLineSpacing);

  doc.text(`Phone: ${phone}`, leftColumnX, startY + 2 * infoLineSpacing);
  doc.text(`Address: ${address}`, rightColumnX, startY + 2 * infoLineSpacing);

  // Save the PDF
  doc.save(`test_result_${caseNo}.pdf`);
};
