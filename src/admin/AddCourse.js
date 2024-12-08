import React, { useState } from "react";
import config from "../config";
import AdminNavBar from "./AdminNavBar";
import ViewAllCourses from "./ViewAllCourses";

const AddCourse = () => {
  const [courseCode, setCourseCode] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCredits, setCourseCredits] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const courseData = {
      courseCode,
      courseName,
      courseDesc,
      courseCredits,
    };

    try {
      const response = await fetch(`${config.url}/admin/addcourses`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(courseData),
      });

      if (response.ok) {
        alert("Course added successfully!");
        setCourseCode("");
        setCourseName("");
        setCourseDesc("");
        setCourseCredits("");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Error adding course.");
      }
    } catch (err) {
      setError("An error occurred while adding the course.");
    }
  };

  return (
    <div>
      <AdminNavBar />
      <div style={styles.container}>
        {/* View All Courses Section */}
        <div style={styles.leftSection}>
          <ViewAllCourses />
        </div>

        {/* Add Course Section */}
        <div style={styles.rightSection}>
          <h2>Add Course</h2>
          {error && <p style={{ color: "red" }}>{error}</p>}
          <form className="form-container" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="courseCode">Course Code:</label>
              <input
                type="text"
                id="courseCode"
                value={courseCode}
                onChange={(e) => setCourseCode(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseName">Course Name:</label>
              <input
                type="text"
                id="courseName"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseDesc">Course Description:</label>
              <input
                type="text"
                id="courseDesc"
                value={courseDesc}
                onChange={(e) => setCourseDesc(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="courseCredits">Course Credits:</label>
              <input
                type="text"
                id="courseCredits"
                value={courseCredits}
                onChange={(e) => setCourseCredits(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Add Course
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "space-between",
    gap: "20px",
    padding: "20px",
  },
  leftSection: {
    flex: 2,
    backgroundColor: "#f9f9f9",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    overflowX: "auto",
  },
  rightSection: {
    flex: 1,
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
};

export default AddCourse;
