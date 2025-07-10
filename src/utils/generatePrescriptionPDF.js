import jsPDF from 'jspdf';
import autoTable from "jspdf-autotable";
import QRCode from 'qrcode';

export const generatePrescriptionPDF = async (prescription) => {
  const doc = new jsPDF();
  const margin = 20;
  const lineGap = 8;

  // Title
  doc.setFontSize(20);
  doc.setTextColor(22, 82, 99);
  doc.text("📄 BookTheDoc - Medical Prescription", margin, 25);

  // Line separator
  doc.setDrawColor(150);
  doc.setLineWidth(0.5);
  doc.line(margin, 30, 190, 30);

  // Prescription Info
  doc.setFontSize(12);
  doc.setTextColor(0);
  doc.setFont("helvetica", "normal");
  doc.text(`Prescription No: ${prescription.prescriptionNumber || 'N/A'}`, margin, 38);
  doc.text(`Date: ${prescription.date?.replaceAll("_", "/") || 'N/A'}   |   Time: ${prescription.time || 'N/A'}`, margin, 46);

  // QR Code
  const qrText = `Prescription No: ${prescription.prescriptionNumber}\nDoctor: ${prescription.doctor?.name}\nPatient: ${prescription.user?.name}\nDate: ${prescription.date}`;
  const qrDataUrl = await QRCode.toDataURL(qrText);
  doc.addImage(qrDataUrl, "PNG", 155, 35, 40, 40);

  // Doctor Info
  doc.setFont("helvetica", "bold");
  doc.text("Doctor:", margin, 60);
  doc.setFont("helvetica", "normal");
  doc.text(`${prescription.doctor?.name || 'N/A'}`, margin + 20, 60);
  doc.text(`${prescription.doctor?.email || 'N/A'}`, margin + 20, 68);

  // Patient Info
  doc.setFont("helvetica", "bold");
  doc.text("Patient:", margin, 82);
  doc.setFont("helvetica", "normal");
  doc.text(`${prescription.user?.name || 'N/A'}`, margin + 20, 82);
  doc.text(`Gender: ${prescription.user?.gender || 'N/A'}`, margin + 20, 90);
  doc.text(`Email: ${prescription.user?.email || 'N/A'}`, margin + 20, 98);
  doc.text(`Phone: ${prescription.user?.phone || 'N/A'}`, margin + 20, 106);

  // Vitals Section
  doc.setFont("helvetica", "bold");
  doc.text("🩺 Vitals:", margin, 120);
  doc.setFont("helvetica", "normal");
  doc.text(`Pulse Rate: ${prescription.pulseRate || 'N/A'} bpm`, margin + 10, 128);
  doc.text(`Blood Pressure: ${prescription.bp || 'N/A'}`, margin + 10, 134);
  doc.text(`SpO₂: ${prescription.spo2 || 'N/A'}`, margin + 10, 140);
  doc.text(`Temperature: ${prescription.temperature || 'N/A'} °C`, margin + 10, 146);

  // Diagnosis
  const diagnosisY = 156;
  doc.setFont("helvetica", "bold");
  doc.text("🔍 Diagnosis:", margin, diagnosisY);
  doc.setFont("helvetica", "normal");
  doc.text(prescription.diagnosis || "N/A", margin, diagnosisY + 8);

  // Medicines Table
  const medicineStartY = diagnosisY + 18;
  doc.setFont("helvetica", "bold");
  doc.text("Prescribed Medicines:", margin, medicineStartY);

  if (prescription.medicines && prescription.medicines.length > 0) {
    const medicineRows = prescription.medicines.map((med, index) => [
      index + 1,
      med.name,
      med.dosage,
      med.frequency,
      med.duration
    ]);

    autoTable(doc, {
      startY: medicineStartY + 6,
      head: [['#', 'Medicine', 'Dosage', 'Frequency', 'Duration']],
      body: medicineRows,
      theme: 'grid',
      headStyles: { fillColor: [22, 82, 99] },
    });
  }

  const afterTableY = doc.lastAutoTable?.finalY || medicineStartY + 20;

  // Lifestyle Advice
  doc.setFont("helvetica", "bold");
  doc.text("🏃‍♂️ Lifestyle Advice:", margin, afterTableY + lineGap);
  doc.setFont("helvetica", "normal");
  doc.text(prescription.lifestyle || "N/A", margin, afterTableY + lineGap + 6);

  // Tests
  doc.setFont("helvetica", "bold");
  doc.text("🧪 Recommended Tests:", margin, afterTableY + lineGap + 20);
  doc.setFont("helvetica", "normal");
  doc.text(prescription.tests || "N/A", margin, afterTableY + lineGap + 26);

  // Follow-Up
  doc.setFont("helvetica", "bold");
  doc.text("📅 Follow-Up Date:", margin, afterTableY + lineGap + 38);
  doc.setFont("helvetica", "normal");
  doc.text(prescription.followUp || "N/A", margin, afterTableY + lineGap + 44);

  // Notes for Patient
  doc.setFont("helvetica", "bold");
  doc.text("📝 Notes for Patient:", margin, 260);
  doc.setFont("helvetica", "normal");

  const notes = [
    "1. Complete the full course of medicines.",
    "2. Contact your doctor if symptoms worsen.",
    "3. Avoid self-medication without consultation.",
    "4. Maintain a healthy lifestyle and stay hydrated."
  ];

  notes.forEach((note, i) => {
    doc.text(note, margin, 268 + i * 6);
  });

  // Save PDF
  const fileName = `${prescription.user?.name || 'patient'}_Prescription.pdf`;
  doc.save(fileName);
};
