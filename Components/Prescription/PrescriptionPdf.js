import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleDownloadPrescription = async (prescription) => {
  const doc = new jsPDF();

  console.log(prescription);
  // Extract data from prescription
  // extract owner information from appointment
  const ownerName = prescription?.appointment?.ownerName || "N/A";
  const caseNo = prescription?.appointment?.caseNo || "N/A";
  const phone = prescription?.appointment?.phone || "N/A";
  const district = prescription?.appointment?.district || "N/A";
  const upazila = prescription?.appointment?.upazila || "N/A";
  const address = prescription?.appointment?.address || "N/A";

  //   const availableMedicines = medicineOrderInfo?.data?.[0].availableMedicines || [];
  //   const unavailableMedicines = medicineOrderInfo?.data?.[0].unavailableMedicines || [];
  //   const ownerName = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.ownerName || "N/A";
  //   const phone = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.phone || "N/A";
  //   const caseNo = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.caseNo || "N/A";

  // Calculate total quantity and total price
  //   const totalQuantity = availableMedicines.reduce((total, medicine) => total + medicine.quantity, 0);
  //   const totalPrice = availableMedicines.reduce((total, medicine) => total + medicine.quantity * medicine.unitPrice, 0).toFixed(2);

  //   // Title
  //   doc.setFontSize(18);
  //   doc.text("Medicine Order", 14, 22);

  //   // Owner Name and Case No
  //   doc.setFontSize(12);
  //   doc.text(`Owner Name: ${ownerName}`, 14, 30);
  //   doc.text(`Case No: ${phone}`, 14, 36);
  //   doc.text(`Case No: ${caseNo}`, 14, 42);

  // Save the PDF
  //   doc.save(`prescription-${caseNo}.pdf`);
};
