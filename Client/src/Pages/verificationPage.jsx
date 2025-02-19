import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import axios from "axios";

export default function VerifyEmail() {
  const { verificationToken } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("pending");

  const handleVerification = async () => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_SERVER_URL
        }/api/auth/verify/${verificationToken}`
      );
      if (response.data.success) {
        setStatus("success");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setStatus("failed");
      }
    } catch (error) {
      setStatus("failed");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Email Verification</h1>
      {status === "pending" && (
        <>
          <p className="mb-4">Click the button below to verify your email.</p>
          <Button
            onClick={handleVerification}
            className="bg-blue-500 text-white">
            Verify Email
          </Button>
        </>
      )}
      {status === "success" && (
        <p className="text-green-600">
          Email verified successfully! Redirecting...
        </p>
      )}
      {status === "failed" && (
        <p className="text-red-600">Verification failed. Try again later.</p>
      )}
    </div>
  );
}
