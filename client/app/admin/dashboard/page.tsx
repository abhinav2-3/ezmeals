"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import QRCode from "qrcode";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const [id, setId] = useState<string | null>(null);
  const [qrCodeData, setQRCodeData] = useState<string | null>(null);

  const generateQR = async () => {
    const url = `http://localhost:3000/user/items/${id}`;
    const qrData = await QRCode.toDataURL(url);
    setQRCodeData(qrData);
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setId(userId);
  }, []);

  return (
    <>
      <div className="h-full px-16 py-8">
        <div className="flex">
          <aside className="w-1/2 h-48 grid place-items-center">
            <div>
              Generate you shop&apos;s QR code. <br />
              Let the people scan it. <br />
              User can <b>Scan</b> -&gt; <b>Pay</b> -&gt; <b>Order</b>
            </div>
          </aside>
          <aside className="w-1/2 h-48 grid place-items-center">
            <Button className="w-36" onClick={() => generateQR()}>
              Generate QR
            </Button>
          </aside>
        </div>
        <div className="ps-20">
          {qrCodeData !== null ? (
            <Image
              src={qrCodeData}
              alt="Shop QR Code"
              width={450}
              height={450}
            />
          ) : (
            <div>You did not created QR Code yet</div>
          )}
        </div>
      </div>
    </>
  );
};

export default Dashboard;
