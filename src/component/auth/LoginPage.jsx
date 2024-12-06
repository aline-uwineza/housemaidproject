import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ApiService from "../../service/ApiService";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/home';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Please fill in all fields.');
            setTimeout(() => setError(''), 5000);
            return;
        }

        try {
            const response = await ApiService.loginUser({ email, password });
            if (response.statusCode === 200) {
                localStorage.setItem('token', response.token);
                localStorage.setItem('role', response.role);
                navigate(from, { replace: true });
            }
        } catch (error) {
            setError(error.response?.data?.message || error.message);
            setTimeout(() => setError(''), 5000);
        }
    };

    return (
        <div style={{
            position: "relative",
            height: "100vh",
            overflow: "hidden",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "linear-gradient(135deg, #6e7cbe, #4a90e2)",
            color: "#fff",
        }}>

            {/* Moving Circles Animation */}
            <div style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                zIndex: -1
            }}>
                <div style={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "#ff6347",
                    width: "200px",
                    height: "200px",
                    animation: "moveCircle1 10s ease-in-out infinite",
                }}></div>
                <div style={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "#32cd32",
                    width: "150px",
                    height: "150px",
                    animation: "moveCircle2 12s ease-in-out infinite",
                    top: "25%",
                    left: "70%",
                }}></div>
                <div style={{
                    position: "absolute",
                    borderRadius: "50%",
                    backgroundColor: "#ffa500",
                    width: "120px",
                    height: "120px",
                    animation: "moveCircle3 8s ease-in-out infinite",
                    top: "60%",
                    left: "20%",
                }}></div>
            </div>

            {/* Login Form */}
            <div style={{
                backgroundColor: "#ffffff",
                padding: "40px",
                borderRadius: "12px",
                boxShadow: "0 15px 30px rgba(0, 0, 0, 0.1)",
                textAlign: "center",
                width: "100%",
                maxWidth: "380px",
                zIndex: 1
            }}>
                <h2 style={{
                    marginBottom: "20px",
                    color: "#333",
                    fontFamily: "'Roboto', sans-serif"
                }}>Login</h2>
                {error && <p style={{
                    color: "red",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    fontSize: "14px"
                }}>{error}</p>}
                <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
                    <div style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <label style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                            color: "#333",
                            fontFamily: "'Roboto', sans-serif"
                        }}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <div style={{
                        marginBottom: "30px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start"
                    }}>
                        <label style={{
                            marginBottom: "5px",
                            fontWeight: "600",
                            color: "#333",
                            fontFamily: "'Roboto', sans-serif"
                        }}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                padding: "12px",
                                width: "100%",
                                borderRadius: "8px",
                                border: "1px solid #ccc",
                                fontSize: "16px",
                                outline: "none",
                                boxSizing: "border-box"
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            backgroundColor: "#4a90e2",
                            color: "#fff",
                            padding: "15px 30px",
                            fontSize: "16px",
                            border: "none",
                            borderRadius: "8px",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background-color 0.3s ease",
                            marginBottom: "20px"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "#357ab7"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "#4a90e2"}
                    >
                        Login
                    </button>
                </form>

                <p style={{
                    color: "#333",
                    fontSize: "14px",
                    fontFamily: "'Roboto', sans-serif"
                }}>
                    Don't have an account? <a href="/register" style={{
                        color: "#4a90e2",
                        textDecoration: "none",
                        fontWeight: "600"
                    }}>Register</a>
                </p>
            </div>

            {/* Inline CSS for Moving Circles Animation */}
            <style>
                {`
                    @keyframes moveCircle1 {
                        0% {
                            transform: translate(-50%, -50%);
                        }
                        25% {
                            transform: translate(15%, 15%);
                        }
                        50% {
                            transform: translate(-20%, -10%);
                        }
                        75% {
                            transform: translate(30%, 40%);
                        }
                        100% {
                            transform: translate(-50%, -50%);
                        }
                    }

                    @keyframes moveCircle2 {
                        0% {
                            transform: translate(-50%, -50%);
                        }
                        25% {
                            transform: translate(-10%, 20%);
                        }
                        50% {
                            transform: translate(15%, 40%);
                        }
                        75% {
                            transform: translate(-25%, -5%);
                        }
                        100% {
                            transform: translate(-50%, -50%);
                        }
                    }

                    @keyframes moveCircle3 {
                        0% {
                            transform: translate(-50%, -50%);
                        }
                        25% {
                            transform: translate(20%, -30%);
                        }
                        50% {
                            transform: translate(-30%, 20%);
                        }
                        75% {
                            transform: translate(10%, 30%);
                        }
                        100% {
                            transform: translate(-50%, -50%);
                        }
                    }
                `}
            </style>
        </div>
    );
}

export default LoginPage;
