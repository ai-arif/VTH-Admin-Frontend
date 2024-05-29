import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleDownloadPrescription = async (prescription, medicines, tests) => {
  const doc = new jsPDF();

  // Extract owner information from appointment
  const ownerName = prescription?.appointment?.ownerName || "N/A";
  const caseNo = prescription?.appointment?.caseNo || "N/A";
  const phone = prescription?.appointment?.phone || "N/A";
  // const district = prescription?.appointment?.district || "N/A";
  const upazila = prescription?.appointment?.upazila || "N/A";
  const address = prescription?.appointment?.address || "N/A";

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const prescriptionWritingDate = formatDate(prescription?.date);
  const nextVisitDate = formatDate(prescription?.nextVisit);

  // Extract patient prescription data from prescription
  const matchingMedicines = medicines?.filter((data) => prescription?.medicines?.includes(data._id)) || [];
  const matchingTests = tests?.filter((data) => prescription?.tests?.includes(data._id)) || [];
  const therapeutics = prescription?.therapeutics || "N/A";
  const diagnosis = prescription?.diagnosis || "N/A";
  const prognosis = prescription?.prognosis || "N/A";
  const advice = prescription?.advice || "N/A";

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
  doc.text("Prescription", doc.internal.pageSize.getWidth() / 2, 45, { align: "center" });

  // Add owner and patient information justified between left and right sides
  doc.setFontSize(10);
  const leftColumnX = 10;
  const rightColumnX = doc.internal.pageSize.getWidth() / 2 + 40;
  const startY = 60;
  const lineSpacing = 10;
  const infoLineSpacing = 7;

  // Add owner information
  doc.text(`Case No: ${caseNo}`, leftColumnX, startY);
  doc.text(`Date: ${prescriptionWritingDate}`, rightColumnX, startY);

  doc.text(`Owner Name: ${ownerName}`, leftColumnX, startY + infoLineSpacing);
  doc.text(`Upazila: ${upazila}`, rightColumnX, startY + infoLineSpacing);

  doc.text(`Phone: ${phone}`, leftColumnX, startY + 2 * infoLineSpacing);
  doc.text(`Address: ${address}`, rightColumnX, startY + 2 * infoLineSpacing);

  // Add prescription details
  doc.text("Diagnosis: ", leftColumnX, startY + 3 * lineSpacing);
  doc.text(diagnosis, leftColumnX + 20, startY + 3 * lineSpacing);

  doc.text("Therapeutics: ", leftColumnX, startY + 4 * lineSpacing);
  doc.text(therapeutics, leftColumnX + 22, startY + 4 * lineSpacing);

  doc.text("Prognosis: ", leftColumnX, startY + 5 * lineSpacing);
  doc.text(prognosis, leftColumnX + 20, startY + 5 * lineSpacing);

  doc.text("Advice: ", leftColumnX, startY + 6 * lineSpacing);
  doc.text(advice, leftColumnX + 20, startY + 6 * lineSpacing);

  doc.text("Next Visit: ", leftColumnX, startY + 7 * lineSpacing);
  doc.text(nextVisitDate, leftColumnX + 20, startY + 7 * lineSpacing);

  // Add medicines table
  doc.autoTable({
    startY: startY + 8 * lineSpacing,
    head: [["Medicine Name", "Dosage", "Frequency"]],
    body: matchingMedicines.map((med) => [med.name, med.dose || "N/A", med.frequency || "N/A"]),
    theme: "grid",
  });

  // Add tests table
  doc.autoTable({
    startY: doc.autoTable.previous.finalY + 9,
    head: [["Test Name", "Description"]],
    body: matchingTests.map((test) => [test.testName, test.description || "N/A"]),
    theme: "grid",
  });

  // Save the PDF
  doc.save(`prescription-${caseNo}.pdf`);
};
