import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleDownloadPrescription = async (prescription) => {
  const doc = new jsPDF();
  console.log({ prescription });
  // load images from URLs
  const loadImage = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Image failed to load");
      const blob = await response.blob();
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
      return dataUrl;
    } catch (error) {
      console.error(`Failed to load image from ${url}:`, error);
      return null;
    }
  };

  // images url
  const leftImageUrl = "https://i.ibb.co/y4wyLbJ/logo.png";
  const rightImageUrl = "https://i.ibb.co/m465Fx5/logo1.png";

  const leftImage = await loadImage(leftImageUrl);
  const rightImage = await loadImage(rightImageUrl);

  // add images to PDF left and right side
  const LeftImageHeight = 17;
  const LeftImageWidth = 19;
  const rightImageHeight = 17;
  const rightImageWidth = 29;

  if (leftImage) {
    doc.addImage(leftImage, "PNG", 10, 10, LeftImageWidth, LeftImageHeight);
  }
  if (rightImage) {
    doc.addImage(rightImage, "PNG", doc.internal.pageSize.getWidth() - rightImageWidth - 10, 10, rightImageWidth, rightImageHeight);
  }

  // Extract owner information from appointment
  const ownerName = prescription?.appointment?.ownerName || "N/A";
  const caseNo = prescription?.appointment?.caseNo || "N/A";
  const phone = prescription?.appointment?.phone || "N/A";
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

  // Extract animal information from appointment
  const animalAge = prescription?.patient?.age || "N/A";
  const animalWeight = prescription?.patient?.weight || "N/A";
  const animalBreed = prescription?.appointment?.breed?.breed || "N/A";
  const animalGender = prescription?.patient?.sex || "N/A";

  const prescriptionWritingDate = formatDate(prescription?.date);
  const nextVisitDate = formatDate(prescription?.nextVisit);

  // Extract patient prescription data from prescription
  const diagnosis = prescription?.diagnosis || "N/A";
  const prognosis = prescription?.prognosis || "N/A";
  const advice = prescription?.advice || "N/A";

  // Extract surgical notes
  const preAnestheticUsed = prescription?.preAnestheticUsed || "N/A";
  const sutureMaterialsUsed = prescription?.sutureMaterialsUsed || "N/A";
  const typeOfSurgery = prescription?.typeOfSurgery || "N/A";
  const postOperativeCare = prescription?.postOperativeCare || "N/A";
  const briefSurgical = prescription?.briefSurgical || "N/A";

  // PDF HEADING & BODY
  // add titles and border
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 111, 192);
  doc.text("VETERINARY TEACHING HOSPITAL", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  doc.setTextColor(0, 0, 0);
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

  //Add animal information
  doc.text(`Age: ${animalAge}`, leftColumnX, startY + 3 * infoLineSpacing);
  doc.text(`Gender: ${animalGender}`, rightColumnX, startY + 3 * infoLineSpacing);

  doc.text(`Body Weight: ${animalWeight}`, leftColumnX, startY + 4 * infoLineSpacing);
  doc.text(`Breed: ${animalBreed}`, rightColumnX, startY + 4 * infoLineSpacing);

  // Add prescription details
  doc.text("Diagnosis: ", leftColumnX, startY + 5 * infoLineSpacing);
  doc.text(diagnosis, leftColumnX + 22, startY + 5 * infoLineSpacing);

  doc.text("Prognosis: ", leftColumnX, startY + 6 * infoLineSpacing);
  doc.text(prognosis, leftColumnX + 22, startY + 6 * infoLineSpacing);

  doc.text("Advice: ", leftColumnX, startY + 7 * infoLineSpacing);
  doc.text(advice, leftColumnX + 22, startY + 7 * infoLineSpacing);

  doc.text("Next Visit: ", leftColumnX, startY + 8 * infoLineSpacing);
  doc.text(nextVisitDate, leftColumnX + 22, startY + 8 * infoLineSpacing);

  let currentY = startY + 9 * infoLineSpacing + 10;

  // Add medicines table
  {
    prescription?.therapeutics?.length > 0 &&
      doc.autoTable({
        startY: currentY,
        head: [["Medicine Name", "Dose", "Route", "Frequency"]],
        body: prescription?.therapeutics?.map((medicine) => [medicine?.medicine_name || "N/A", medicine?.first || "N/A", medicine?.second || "N/A", medicine?.third || "N/A"]),
        theme: "grid",
      });
  }

  currentY = doc.lastAutoTable.finalY + 10;

  // Add surgical notes
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Surgical Notes:", leftColumnX, currentY);

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text("Pre-Anesthetic used: ", leftColumnX, currentY + infoLineSpacing);
  doc.text(preAnestheticUsed, leftColumnX + 45, currentY + infoLineSpacing);

  doc.text("Suture materials used: ", leftColumnX, currentY + 2 * infoLineSpacing);
  doc.text(sutureMaterialsUsed, leftColumnX + 45, currentY + 2 * infoLineSpacing);

  doc.text("Type of surgery: ", leftColumnX, currentY + 3 * infoLineSpacing);
  doc.text(typeOfSurgery, leftColumnX + 45, currentY + 3 * infoLineSpacing);

  doc.text("Post operative care: ", leftColumnX, currentY + 4 * infoLineSpacing);
  doc.text(postOperativeCare, leftColumnX + 45, currentY + 4 * infoLineSpacing);

  doc.text("Brief Surgical Procedure: ", leftColumnX, currentY + 5 * infoLineSpacing);
  doc.text(briefSurgical, leftColumnX + 45, currentY + 5 * infoLineSpacing);

  // Save the PDF
  doc.save(`prescription-${caseNo}.pdf`);
};
