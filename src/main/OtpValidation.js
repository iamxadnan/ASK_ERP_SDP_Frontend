import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const OtpValidation = () => {
  const [otp, setOtp] = useState("");
  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2001/faculty/validate-otp", { email, otp });
      setResponseMessage(response.data);
      if (response.data.includes("OTP validated successfully")) {
        navigate("/update-profile", { state: { email } }); // Pass email to Update Profile component
      }
    } catch (error) {
      setResponseMessage("Invalid OTP. Please try again.");
    }
  };

  return (
    <div className="otp-validation" style={{ marginTop: "190px" }}>
      <h2>Validate OTP</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          OTP:
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </label>
        <button className="submit-button" type="submit">
          Validate OTP
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default OtpValidation;
