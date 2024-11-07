import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";

export const handleDownloadDoctorTestResult = async (testResult, resultFormat) => {
  const doc = new jsPDF();

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

  // extract owner information from appointment
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
  const appointmentDate = formatDate(testResult?.data?.resultDate);

  // extract animal information from appointment
  /* As per earlier system we used to get this data during registration but now we get the data during appointment that's why use || operator */
  const animalAge = testResult?.appointmentId?.age || testResult?.registrationId?.age || "N/A";
  const animalWeight = testResult?.appointmentId?.weight || testResult?.registrationId?.weight || "N/A";
  const animalBreed = testResult?.appointmentId?.breed?.breed || "N/A";
  const animalSpecies = testResult?.appointmentId?.species?.name || "N/A";
  const animalGender = testResult?.appointmentId?.sex || testResult?.registrationId?.sex || "N/A";

  // PDF HEADING & BODY
  // add titles and border
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(0, 111, 192);
  doc.text("VETERINARY TEACHING HOSPITAL", doc.internal.pageSize.getWidth() / 2, 20, { align: "center" });
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text("Bangladesh Agricultural University, Mymensingh-2202", doc.internal.pageSize.getWidth() / 2, 30, { align: "center" });
  doc.setLineWidth(0.5);
  doc.line(10, 35, doc.internal.pageSize.getWidth() - 10, 35);
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text("Test Result", doc.internal.pageSize.getWidth() / 2, 45, { align: "center" });

  // add owner and animal information justified between left and right sides
  doc.setFontSize(10);
  const leftColumnX = 10;
  const rightColumnX = doc.internal.pageSize.getWidth() / 2 + 40;
  const startY = 60;
  const lineSpacing = 10;
  const infoLineSpacing = 7;

  // add owner information
  doc.text(`Case No: ${caseNo}`, leftColumnX, startY);
  doc.text(`Date: ${appointmentDate}`, rightColumnX, startY);

  doc.text(`Owner Name: ${ownerName}`, leftColumnX, startY + infoLineSpacing);
  doc.text(`Upazila: ${upazila}`, rightColumnX, startY + infoLineSpacing);

  doc.text(`Phone: ${phone}`, leftColumnX, startY + 2 * infoLineSpacing);
  doc.text(`Address: ${address}`, rightColumnX, startY + 2 * infoLineSpacing);

  // add animal information
  doc.text(`Age: ${animalAge}`, leftColumnX, startY + 3 * infoLineSpacing);
  doc.text(`Gender: ${animalGender}`, rightColumnX, startY + 3 * infoLineSpacing);

  doc.text(`Body Weight: ${animalWeight}`, leftColumnX, startY + 4 * infoLineSpacing);
  doc.text(`Breed: ${animalBreed}`, rightColumnX, startY + 4 * infoLineSpacing);

  doc.text(`Species: ${animalSpecies}`, leftColumnX, startY + 5 * infoLineSpacing);

  let currentY = startY + 6 * lineSpacing;

  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.text("Test Name: ", leftColumnX + 3, currentY);
  const testNameWidth = doc.getTextWidth("Test Name: ");
  doc.setFont("helvetica", "normal");
  doc.text(resultFormat?.testName, leftColumnX + testNameWidth + 4, currentY);

  const totalTestNameWidth = testNameWidth + 4 + doc.getTextWidth(resultFormat?.testName);
  doc.line(leftColumnX + 3, currentY + 1, leftColumnX + 3 + totalTestNameWidth, currentY + 1);

  resultFormat?.tests?.forEach((test, index) => {
    if (index > 0) {
      currentY += lineSpacing;
    }

    currentY += lineSpacing;

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(`${test?.test_subTitle}:`, leftColumnX + 3, currentY);
    doc.setFont("helvetica", "normal");

    const tableStartY = currentY + lineSpacing - 6;
    autoTable(doc, {
      startY: tableStartY,
      head: [[test?.parameter_title, test?.result_title, test?.unit_title, test?.range_title]],
      body: test?.params?.map((item) => [
        item?.param,
        typeof testResult?.data?.[`${test?.test_subTitle}#${item?.param}`] === "string"
          ? testResult?.data?.[`${test?.test_subTitle}#${item?.param}`]
          : testResult?.data?.[`${test?.test_subTitle}#${item?.param.split("[")[0]}`]?.[`${item?.param.split("[")[1].replace("]", "")}`],
        item?.unit,
        item?.references?.join(", "),
      ]),
    });

    currentY = doc.lastAutoTable.finalY + lineSpacing;
  });

  currentY += lineSpacing;

  // add interpretation and lab technician fields
  doc.setFont("helvetica", "bold");
  doc.text("Interpretation:", leftColumnX + 3, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(testResult?.data?.interpretation || "N/A", leftColumnX + 29, currentY);

  currentY += lineSpacing - 3;

  doc.setFont("helvetica", "bold");
  doc.text("Lab Technician/Consultant:", leftColumnX + 3, currentY);
  doc.setFont("helvetica", "normal");
  doc.text(testResult?.data?.lab_technician || "N/A", leftColumnX + 51, currentY);

  // Save the PDF
  doc.save(`test_result_${caseNo}.pdf`);
};
