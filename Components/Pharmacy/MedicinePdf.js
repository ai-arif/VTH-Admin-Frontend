import jsPDF from "jspdf";
import "jspdf-autotable";

export const handleDownloadMedicine = async (medicineOrderInfo) => {
  const doc = new jsPDF();

  // Extract data from medicineOrderInfo
  const availableMedicines = medicineOrderInfo?.data?.[0].availableMedicines || [];
  const unavailableMedicines = medicineOrderInfo?.data?.[0].unavailableMedicines || [];
  const ownerName = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.ownerName || "N/A";
  const phone = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.phone || "N/A";
  const caseNo = medicineOrderInfo?.data[0]?.prescriptionDetails?.appointmentDetails?.caseNo || "N/A";

  // Calculate total quantity and total price
  const totalQuantity = availableMedicines.reduce((total, medicine) => total + medicine.quantity, 0);
  const totalPrice = availableMedicines.reduce((total, medicine) => total + medicine.quantity * medicine.unitPrice, 0).toFixed(2);

  // Title
  doc.setFontSize(18);
  doc.text("Medicine Order", 14, 22);

  // Owner Name and Case No
  doc.setFontSize(12);
  doc.text(`Owner Name: ${ownerName}`, 14, 30);
  doc.text(`Phone No: ${phone}`, 14, 36);
  doc.text(`Case No: ${caseNo}`, 14, 42);

  // Available Medicines Table
  const availableMedicinesColumns = ["Medicine Name", "Unit Price", "Quantity", "Price"];
  const availableMedicinesRows = availableMedicines.map((med) => [med.medicineName, med.unitPrice.toFixed(2), med.quantity, (med.unitPrice * med.quantity).toFixed(2)]);

  doc.autoTable({
    startY: 46,
    head: [availableMedicinesColumns],
    body: availableMedicinesRows,
  });

  // Unavailable Medicines
  const startY = doc.autoTable.previous.finalY + 10;
  doc.setFontSize(12);
  doc.text("Unavailable Medicines:", 14, startY);
  doc.setFontSize(10);
  doc.text(unavailableMedicines.join(", "), 14, startY + 6);

  // Total Quantity and Total Price
  doc.setFontSize(12);
  doc.text(`Total Quantity: ${totalQuantity}`, 14, startY + 20);
  doc.text(`Total Price: ${totalPrice} TK.`, 14, startY + 26);

  // Save the PDF
  doc.save(`medicine-order-${caseNo}.pdf`);
};
