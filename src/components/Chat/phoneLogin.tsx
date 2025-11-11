"use client";

import { auth } from "@src/lib/firebase";
import type { ConfirmationResult } from "firebase/auth";
import axios from "axios";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useState } from "react";

export default function PhoneLogin() {
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(
    null
  );

  const sendOTP = async () => {
    const appVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
    });

    const result = await signInWithPhoneNumber(
      auth,
      "+91" + phone,
      appVerifier
    );
    setConfirmation(result);
    setOtpSent(true);
  };

  const verifyOTP = async () => {
    const result = await confirmation!.confirm(otp);

    // ✅ Firebase ID Token
    const idToken = await result.user.getIdToken();

    // ✅ Send token to backend (Adonis)
    const res = await axios.post("http://localhost:3333/auth/firebase/phone", {
      token: idToken,
    });

    console.log("Backend response", res.data);
  };

  return (
    <div className="p-6">
      <h2>Phone Login</h2>

      <input
        type="text"
        placeholder="Enter phone number"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />

      <button onClick={sendOTP}>Send OTP</button>

      <div id="recaptcha-container"></div>

      {otpSent && (
        <>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
