import { useTheme } from "../../../context/ThemeContext";
import React, { useState } from "react";

export default function AddUser() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // State
  const [url, setUrl] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [description, setDescription] = useState("");
  const [verifySSL, setVerifySSL] = useState(false);

  // Styles
  const styles = {
    container: {
      background: isDark ? "transparent" : "#f8fafc",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "24px",
      color: isDark ? "#ffffff" : "#0f172a",
    },
    contentWrapper: {
      width: "80%",
      maxWidth: "1000px",
    },
    title: {
      fontWeight: "bold",
      color: isDark ? "#fff" : "#0f172a",
      padding: "10px",
      fontSize: "20px",
    },
    gradientBorder: {
      height: "3px",
      background: "linear-gradient(to right, #ff0080, #7928ca, #00bfff)",
      marginBottom: "20px",
    },
    input: {
      width: "100%",
      padding: "10px",
      fontSize: "16px",
      
      borderRadius: "6px",
      background: isDark ? "#0E11164D" : "#B7B7B71A",
      color: isDark ? "#ffffff" : "#0f172a",
      outline: "none",
      marginTop: "10px",
    },
    toggleContainer: {
      marginTop: "20px",
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    buttonStyle: {
      background: "linear-gradient(to right, #E47692, #47CBE4)",
      color: "#ffffff",
      padding: "10px 100px",
      border: "none",
      cursor: "pointer",
      fontSize: "16px",
      marginTop: "20px",
      borderRadius: "6px",
    },
  };

  //state to display error message
  const [error, setError] = useState("");

  // Submit handler
  const submitData = () => {
    const formData = { url, apiKey, description, verifySSL };
    //check if input valid
    if (url.trim() === "" || apiKey.trim() === "") {
      setError("URL and API Key are required fields.");

      console.error("Error: URL and API Key are required fields.");
      return;
    }
    setError(""); // Clear error 
    console.log("Form Data Submitted:", formData);
    //reset form
    setUrl(""); setApiKey(""); setDescription(""); setVerifySSL(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.contentWrapper}>
        <h1 style={styles.title}>Add MISP API</h1>
        <div style={styles.gradientBorder}></div>

        {/* Input boxes */}
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <input
          type="text"
          placeholder="Enter API Key"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ ...styles.input, height: "100px", resize: "none" }}
        />

        {/* Toggle */}
        <div style={styles.toggleContainer}>
          <ToggleButton isOn={verifySSL} setIsOn={setVerifySSL} />
          <span>Verify SSL Certificate</span>
        </div>

        {/* Submit Button */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button style={styles.buttonStyle} onClick={submitData}>
            Submit
          </button>
        </div>
        {/* Error Message */}
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        
      </div>
    </div>
  );
}

// ToggleButton Component
function ToggleButton({ isOn, setIsOn }) {
  const toggleStyles = {
    container: {
      width: "50px",
      height: "25px",
      borderRadius: "25px",
      background: isOn ? "#3b82f6" : "#ccc",
      display: "flex",
      alignItems: "center",
      padding: "3px",
      cursor: "pointer",
      transition: "background 0.3s ease",
    },
    knob: {
      width: "20px",
      height: "20px",
      borderRadius: "50%",
      background: "#fff",
      transform: isOn ? "translateX(24px)" : "translateX(0)",
      transition: "transform 0.3s ease",
    },
  };

  return (
    <div style={toggleStyles.container} onClick={() => setIsOn(!isOn)}>
      <div style={toggleStyles.knob}></div>
    </div>
  );
}
