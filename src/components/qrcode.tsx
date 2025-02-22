import React, { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";
import axios from "axios";

// Define an interface for the detailed scan result.  Adjust properties as needed
interface QRScanResult {
  data: string;
  format: string;
  // ... other properties from the detailed scan result (check qr-scanner docs)
}

const QrCodeScanner = () => {
  const [qrCode, setQrCode] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const scannerRef = useRef<QrScanner | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        setHasPermission(true);
        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
      } catch (error) {
        console.error("Camera permission denied:", error);
        setHasPermission(false);
      }
    };

    getCameraPermission();
  }, []);

  useEffect(() => {
    if (hasPermission === true && videoRef.current) {
      console.log("Video element found:", videoRef.current);

      scannerRef.current = new QrScanner(
        videoRef.current,
        (result: QRScanResult) => {
          // Use the interface here
          console.log("Decoded QR Code:", result);
          setQrCode(result.data); // Access data property
        },
        (error: string | Error) => {
          console.error("QR Scanner Error:", error);
        },
        { returnDetailedScanResult: true } // Use detailed results
      );

      scannerRef.current
        .start()
        .then(() => {
          console.log("Scanner started successfully");
        })
        .catch((err) => {
          console.error("Error starting scanner:", err);
        });

      return () => {
        if (scannerRef.current) {
          scannerRef.current.stop();
          console.log("Scanner stopped");
        }
      };
    } else if (hasPermission === false) {
      console.error("Cannot start QR scanner: Camera permission denied.");
    }
  }, [hasPermission]);

  useEffect(() => {
    if (qrCode) {
      const fetchAttendance = async () => {
        try {
          const response = await axios.post(`${BASE_URL}/users/attendance`, {
            qrCode,
          });
          console.log("Attendance recorded:", response.data);
        } catch (error) {
          console.error("Error recording attendance:", error);
        }
      };

      fetchAttendance();
    }
  }, [qrCode, BASE_URL]);

  if (hasPermission === null) {
    return <div>Requesting camera permission...</div>;
  }

  if (hasPermission === false) {
    return (
      <div>Camera permission denied. Please grant access to the camera.</div>
    );
  }

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <video ref={videoRef} width="100%" height="auto" />
      <div>
        {qrCode ? (
          <p>
            Scanned QR Code: <strong>{qrCode}</strong>
          </p>
        ) : (
          <p>Scanning for QR codes...</p>
        )}
      </div>
    </div>
  );
};

export default QrCodeScanner;
