import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ApiService from "../../service/ApiService";

function RegisterPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const { name, email, password, phoneNumber } = formData;
        return name && email && password && phoneNumber;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) {
            setErrorMessage("Please fill all the fields.");
            setTimeout(() => setErrorMessage(""), 5000);
            return;
        }

        try {
            const response = await ApiService.registerUser(formData);
            if (response.statusCode === 200) {
                setFormData({
                    name: "",
                    email: "",
                    password: "",
                    phoneNumber: "",
                });
                setSuccessMessage("User registered successfully!");
                setTimeout(() => {
                    setSuccessMessage("");
                    navigate("/");
                }, 3000);
            }
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message);
            setTimeout(() => setErrorMessage(""), 5000);
        }
    };

    return (
        <div
            style={{
                position: "relative",
                height: "100vh",
                overflow: "hidden",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "linear-gradient(135deg, #ff7f50, #87ceeb)",
                fontFamily: "'Roboto', sans-serif",
                color: "#333",
            }}
        >
            {/* Moving Circles */}
            <div style={{ position: "absolute", zIndex: -1, width: "100%", height: "100%" }}>
                <div
                    style={{
                        position: "absolute",
                        width: "150px",
                        height: "150px",
                        borderRadius: "50%",
                        backgroundColor: "#ff6347",
                        animation: "moveCircle1 10s infinite",
                        top: "20%",
                        left: "10%",
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        width: "100px",
                        height: "100px",
                        borderRadius: "50%",
                        backgroundColor: "#32cd32",
                        animation: "moveCircle2 12s infinite",
                        top: "50%",
                        left: "80%",
                    }}
                ></div>
                <div
                    style={{
                        position: "absolute",
                        width: "120px",
                        height: "120px",
                        borderRadius: "50%",
                        backgroundColor: "#ffa500",
                        animation: "moveCircle3 8s infinite",
                        top: "70%",
                        left: "40%",
                    }}
                ></div>
            </div>

            {/* Registration Form */}
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: "40px",
                    borderRadius: "12px",
                    boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    width: "100%",
                    maxWidth: "400px",
                    zIndex: 1,
                }}
            >
                <h2 style={{ marginBottom: "20px", color: "#333" }}>Sign Up</h2>
                {errorMessage && (
                    <p style={{ color: "red", fontWeight: "bold", marginBottom: "20px" }}>{errorMessage}</p>
                )}
                {successMessage && (
                    <p style={{ color: "green", fontWeight: "bold", marginBottom: "20px" }}>{successMessage}</p>
                )}
                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: "20px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>
                            Phone Number:
                        </label>
                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: "30px", textAlign: "left" }}>
                        <label style={{ display: "block", marginBottom: "5px", fontWeight: "600" }}>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                            }}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#4a90e2",
                            color: "#fff",
                            padding: "15px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background-color 0.3s",
                        }}
                        onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab7")}
                        onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
                    >
                        Register
                    </button>
                </form>
                <p>
                    Already have an account?{" "}
                    <a
                        href="/login"
                        style={{
                            color: "#4a90e2",
                            textDecoration: "none",
                            fontWeight: "600",
                        }}
                    >
                        Login
                    </a>
                </p>
            </div>

            {/* Animation Styles */}
            <style>
                {`
                    @keyframes moveCircle1 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(50px, -50px); }
                        100% { transform: translate(0, 0); }
                    }
                    @keyframes moveCircle2 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(-30px, 60px); }
                        100% { transform: translate(0, 0); }
                    }
                    @keyframes moveCircle3 {
                        0% { transform: translate(0, 0); }
                        50% { transform: translate(40px, -40px); }
                        100% { transform: translate(0, 0); }
                    }
                `}
            </style>
        </div>
    );
}

export default RegisterPage;
