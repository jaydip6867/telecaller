import { useState } from "react";
import API from "../api/axios";

const ForgotPassword = () => {
    const [formData, setFormData] = useState({
        email: "",
        newPassword: "",
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await API.post(
                "/auth/forgot-password",
                formData
            );

            setMessage(data.message);
            setFormData({ email: "", newPassword: "" });
        } catch (error) {
            setMessage(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <div className="login-header">
                    <h2>Forgot Password</h2>
                    <p>Enter your email and set new password</p>
                </div>

                {message && <div className="fp-message">{message}</div>}

                <form onSubmit={handleSubmit} autoComplete="off">
                    <input
                        type="email"
                        name="email"
                        placeholder="Enter email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input"
                        autoComplete="off"
                    />
                    <input
                        type="password"
                        name="newPassword"
                        placeholder="Enter new password"
                        value={formData.newPassword}
                        onChange={handleChange}
                        required
                        className="input"
                        autoComplete="off"
                    />

                    <button type="submit" className="login-btn">Update Password</button>
                </form>

                <a href="/" className="fp-link">
                    Back to Login
                </a>
            </div>
        </div>
    );
};

export default ForgotPassword;