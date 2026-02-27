import { BookingType, TaxiBookingsTypes } from "@/types";
import jsPDF from "jspdf";

// Helper function to load image as base64
const loadImageAsBase64 = async (imagePath: string): Promise<string> => {
  try {
    // Create absolute URL
    const absoluteUrl = `${window.location.origin}${imagePath}`;
    console.log("Attempting to load image from:", absoluteUrl);

    const response = await fetch(absoluteUrl);

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`);
    }

    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("Image successfully loaded as base64");
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        console.error("FileReader error:", error);
        reject(error);
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error loading image:", error);
    console.warn(
      "Logo will not be displayed in PDF. Please ensure the image exists at the specified path."
    );
    return "";
  }
};

export const downloadTourPDF = async (pack: BookingType) => {
  const doc = new jsPDF();

  // Set document properties
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 15;

  // Add background color for header
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Load and add logo (after header so it's on top)
  try {
    const logoBase64 = await loadImageAsBase64("/devnagri.png");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", margin, 8, 25, 25);
    }
  } catch (error) {
    console.error("Failed to add logo to PDF:", error);
  }

  // Add company logo area and name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("DEVNAGRI TOUR", pageWidth / 2, 25, { align: "center" });

  doc.setTextColor(0, 0, 0);
  yPosition = 55;

  // Add header separator
  doc.setLineWidth(2);
  doc.setDrawColor(41, 128, 185);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  // Add booking receipt title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING RECEIPT", margin, yPosition);

  yPosition += 12;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  // Add tour information section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Tour Information", margin, yPosition);

  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Package Name
  doc.setFont("helvetica", "bold");
  doc.text("Package Name:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(pack.name ?? "N/A", margin + 50, yPosition);
  yPosition += 8;

  // Start Date
  doc.setFont("helvetica", "bold");
  doc.text("Start Date:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text((pack.startDate as string) ?? "N/A", margin + 50, yPosition);
  yPosition += 8;

  // Duration
  doc.setFont("helvetica", "bold");
  doc.text("Duration:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(`${pack.days} days`, margin + 50, yPosition);
  yPosition += 8;

  // Number of People
  doc.setFont("helvetica", "bold");
  doc.text("Number of People:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(`${pack.people}`, margin + 50, yPosition);
  yPosition += 10;

  // Status
  doc.setFont("helvetica", "bold");
  doc.text("Booking Status:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  const status = pack.status?.toUpperCase() ?? "PENDING";
  doc.text(status, margin + 50, yPosition);
  yPosition += 10;

  // Places (if available)
  if ((pack.placeList ?? []).length > 0) {
    doc.setFont("helvetica", "bold");
    doc.text("Places to Visit:", margin, yPosition);
    yPosition += 7;
    doc.setFont("helvetica", "normal");
    const places = pack.placeList ?? "";
    const splitPlaces = doc.splitTextToSize(places, pageWidth - 2 * margin - 5);
    doc.text(splitPlaces, margin + 5, yPosition);
    yPosition += splitPlaces.length * 6;
  }

  // Add spacing before price section
  yPosition += 5;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 12;

  // Add price section with background
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 20, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Starting Price:", margin + 10, yPosition + 5);
  doc.setTextColor(41, 128, 185);
  doc.setFontSize(16);
  doc.text(`Rs. ${pack.price}`, pageWidth - margin - 30, yPosition + 5);
  doc.setTextColor(0, 0, 0);

  // Add footer with contact information
  const footerYPosition = pageHeight - 55;
  doc.setLineWidth(0.5);
  doc.setDrawColor(41, 128, 185);
  doc.line(margin, footerYPosition, pageWidth - margin, footerYPosition);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Information", pageWidth / 2, footerYPosition + 8, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const contactLines = [
    "Email: devnagagritourandtravel@gmail.com",
    "Phone: +91 9456193464",
    "Instagram: devnagaritours",
    "Website: www.devnagritour.com",
    "Address: Pithoragarh, Uttarakhand, India",
  ];

  let contactY = footerYPosition + 16;
  contactLines.forEach((line) => {
    doc.text(line, pageWidth / 2, contactY, { align: "center" });
    contactY += 6;
  });

  // Add generated date at the very bottom
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()} | Thank you for choosing Devnagri Tour!`,
    pageWidth / 2,
    pageHeight - 5,
    { align: "center" }
  );

  // Save the PDF
  doc.save(
    `booking-receipt-${pack.name?.replace(/\s+/g, "-")}-${pack.date
      ?.toLocaleString()
      .replace(/\s+/g, "-")}.pdf`
  );
};

export const downloadTaxiPDF = async (pack: TaxiBookingsTypes) => {
  const doc = new jsPDF();

  // Set document properties
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = 15;

  // Add background color for header
  doc.setFillColor(41, 128, 185);
  doc.rect(0, 0, pageWidth, 50, "F");

  // Load and add logo (after header so it's on top)
  try {
    const logoBase64 = await loadImageAsBase64("/devnagri.png");
    if (logoBase64) {
      doc.addImage(logoBase64, "PNG", margin, 8, 25, 25);
    }
  } catch (error) {
    console.error("Failed to add logo to PDF:", error);
  }

  // Add company logo area and name
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("TAXI BOOKING RECEIPT", pageWidth / 2, 25, { align: "center" });

  doc.setTextColor(0, 0, 0);
  yPosition = 55;

  // Add header separator
  doc.setLineWidth(2);
  doc.setDrawColor(41, 128, 185);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  // Add booking receipt title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text("BOOKING RECEIPT", margin, yPosition);

  yPosition += 12;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 10;

  // Add taxi booking details section
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Booking Details", margin, yPosition);

  yPosition += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");

  // Vehicle Number
  doc.setFont("helvetica", "bold");
  doc.text("Vehicle Number:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(pack.taxi?.vehicleNumber ?? "N/A", margin + 50, yPosition);
  yPosition += 10;

  // Booking Date
  doc.setFont("helvetica", "bold");
  doc.text("Booking Date:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text((pack.bookingDate as string) ?? "N/A", margin + 50, yPosition);
  yPosition += 10;

  // Source
  doc.setFont("helvetica", "bold");
  doc.text("Source:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(pack.source ?? "N/A", margin + 50, yPosition);
  yPosition += 10;

  // Destination
  doc.setFont("helvetica", "bold");
  doc.text("Destination:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(pack.destination ?? "N/A", margin + 50, yPosition);
  yPosition += 10;

  // Price
  doc.setFont("helvetica", "bold");
  doc.text("Total Price:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  doc.text(`Rs ${pack.price}`, margin + 50, yPosition);
  yPosition += 12;

  // Add price section separator
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  yPosition += 8;

  // Add highlighted price section
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, yPosition - 5, pageWidth - 2 * margin, 20, "F");
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("Total Amount:", margin + 10, yPosition + 5);
  doc.setTextColor(41, 128, 185);
  doc.setFontSize(16);
  doc.text(`Rs. ${pack.price}`, pageWidth - margin - 30, yPosition + 5);
  doc.setTextColor(0, 0, 0);

  yPosition += 20;

  // Taxi Information
  if (pack.taxi) {
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Vehicle Information", margin, yPosition);
    yPosition += 10;
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Driver Name
    doc.setFont("helvetica", "bold");
    doc.text("Driver Name:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(pack.taxi.driver ?? "N/A", margin + 50, yPosition);
    yPosition += 10;

    // Driver Phone
    doc.setFont("helvetica", "bold");
    doc.text("Driver Contact:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(pack.taxi.driverPhoneNumber ?? "N/A", margin + 50, yPosition);
    yPosition += 10;

    // Car Type
    doc.setFont("helvetica", "bold");
    doc.text("Car Type:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(pack.taxi.model ?? "N/A", margin + 50, yPosition);
    yPosition += 10;

    // Seats
    doc.setFont("helvetica", "bold");
    doc.text("Available Seats:", margin, yPosition);
    doc.setFont("helvetica", "normal");
    doc.text(`${pack.taxi.seats ?? "N/A"}`, margin + 50, yPosition);
    yPosition += 10;
  }

  yPosition += 5;

  // Status
  doc.setFont("helvetica", "bold");
  doc.text("Booking Status:", margin, yPosition);
  doc.setFont("helvetica", "normal");
  const status = pack.status?.toUpperCase() ?? "PENDING";
  doc.text(status, margin + 50, yPosition);

  // Add spacing before footer
  yPosition += 15;
  doc.setLineWidth(0.5);
  doc.setDrawColor(200, 200, 200);
  doc.line(margin, yPosition, pageWidth - margin, yPosition);

  // Add footer with contact information
  const footerYPosition = pageHeight - 55;
  doc.setLineWidth(0.5);
  doc.setDrawColor(41, 128, 185);
  doc.line(margin, footerYPosition, pageWidth - margin, footerYPosition);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("Contact Information", pageWidth / 2, footerYPosition + 8, {
    align: "center",
  });

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const contactLines = [
    "Email: devnagagritourandtravel@gmail.com",
    "Phone: +91 9456193464",
    "Instagram: devnagaritours",
    "Website: www.devnagritour.com",
    "Address: Pithoragarh, Uttarakhand, India",
  ];

  let contactY = footerYPosition + 16;
  contactLines.forEach((line) => {
    doc.text(line, pageWidth / 2, contactY, { align: "center" });
    contactY += 6;
  });

  // Add generated date at the very bottom
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(128, 128, 128);
  doc.text(
    `Generated on: ${new Date().toLocaleDateString()} | Thank you for choosing Devnagri Tour!`,
    pageWidth / 2,
    pageHeight - 5,
    { align: "center" }
  );

  // Save the PDF
  doc.save(
    `taxi-booking-receipt-${pack.taxi?.vehicleNumber?.replace(
      /\s+/g,
      "-"
    )}-${pack.date?.toLocaleString().replace(/\s+/g, "-")}.pdf`
  );
};
