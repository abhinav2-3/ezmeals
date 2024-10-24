"use client";
import { useEffect, useState } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const QRCodeGenerator = ({ shopId }: { shopId: string }) => {
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  useEffect(() => {
    const generateQR = async () => {
      const url = `http://localhost:3000/user/items/${shopId}`;
      const qrData = await QRCode.toDataURL(url);
      setQRCodeData(qrData);
    };
    generateQR();
  }, [shopId]);

  return qrCodeData ? (
    <Image src={qrCodeData} alt="Shop QR Code" width={450} height={450} />
  ) : (
    <p>Loading...</p>
  );
};

export default QRCodeGenerator;
