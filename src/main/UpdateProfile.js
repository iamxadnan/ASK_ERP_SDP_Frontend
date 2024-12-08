import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const UpdateProfile = () => {
  const location = useLocation();
  const email = location.state?.email; // Get email from navigation state
  const [profileData, setProfileData] = useState({
    email: email || "",
    firstname: "",
    lastname: "",
    dateOfBirth: "",
    gender: "",
    password: "",
  });
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    // Optionally, fetch existing profile data
    if (email) {
      axios
        .get(`http://localhost:2001/faculty/profile?email=${email}`)
        .then((response) => {
          setProfileData((prev) => ({ ...prev, ...response.data }));
        })
        .catch((error) => console.error("Error fetching profile data:", error));
    }
  }, [email]);

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(profileData)
      const response = await axios.put(
        "http://localhost:2001/faculty/update-profile",
        profileData
      );
      
      setResponseMessage(response.data);
    } catch (error) {
      setResponseMessage("Error updating profile. Please try again.");
    }
  };

  return (
    <div className="update-profile" style={{ marginTop: "190px" }}>
      <h2>Update Profile</h2>
      <form className="form-container" onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstname"
            value={profileData.firstname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastname"
            value={profileData.lastname}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={profileData.dateOfBirth}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Gender:
          <select
            name="gender"
            value={profileData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={profileData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button className="submit-button" type="submit">
          Update Profile
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default UpdateProfile;
