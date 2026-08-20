
import "./ForgotPassword.css";
import PageLayout from "../layouts/PageLayout";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../services/api";

function ForgotPassword() {



    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [identifier, setIdentifier] = useState("");

    const [otp, setOtp] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ]);

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const [resendSeconds, setResendSeconds] = useState(0);

    const [resendLoading, setResendLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    const [userId, setUserId] = useState("");

    const otpRefs = useRef([]);


useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setInterval(() => {
        setResendSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
}, [resendSeconds]);


    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) {
            return;
        }

        const updatedOtp = [...otp];

        updatedOtp[index] = value;

        setOtp(updatedOtp);

        setError("");

        if (value && index < 5) {

            otpRefs.current[index + 1]?.focus();

        }

    };

    const handleOtpKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !otp[index] &&
            index > 0
        ) {

            otpRefs.current[index - 1]?.focus();

        }

    };

    const handleSendOtp = async () => {

        const value = identifier.trim();

        setError("");
        setSuccess("");

        if (!value) {

            setError(
                "Please enter your registered email or mobile number."
            );

            return;

        }

        const isEmail = value.includes("@");

        if (isEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {

            setError("Please enter a valid email address.");

            return;

        }

        try {

            setLoading(true);

            const body = isEmail
                ? { email: value }
                : { mobile: value };

            const result = await api(
                "/auth/forgot-password",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                }
            );

            console.log(
                "Forgot password OTP response:",
                result
            );

            setUserId(result.data?.userId || result.userId || "");

            setStep(2);

            setResendSeconds(30);

            setSuccess(
                "OTP has been sent successfully."
            );

        } catch (error) {

            console.error(
                "Forgot password error:",
                error
            );

            setError(
                error.message ||
                "Unable to send OTP. Please try again."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleVerifyOtp = async () => {

        setError("");
        setSuccess("");

        const enteredOtp = otp.join("");

        if (enteredOtp.length !== 6) {

            setError(
                "Please enter the complete 6-digit OTP."
            );

            return;

        }

        try {

            setLoading(true);

            const value = identifier.trim();

            const isEmail = value.includes("@");

            const body = isEmail
                ? {
                    email: value,
                    otp: enteredOtp,
                  }
                : {
                    mobile: value,
                    otp: enteredOtp,
                  };

        const result = await api(
            "/auth/verify-forgot-password-otp",
            {
                method: "POST",
                body: JSON.stringify(body),
            }
        );

        console.log(
            "Forgot password OTP verification:",
            result
        );

        setStep(3);

        setSuccess(
            "OTP verified successfully."
        );

        } catch (error) {

            console.error(
                "OTP verification error:",
                error
            );

            setError(
                error.message ||
                "Incorrect or expired OTP."
            );

        } finally {

            setLoading(false);

        }

    };

    const handleResendOtp = async () => {

        if (resendSeconds > 0 || resendLoading) {
            return;
        }

        setError("");
        setSuccess("");

        try {

            setResendLoading(true);

            const value = identifier.trim();

            const isEmail = value.includes("@");

            const body = isEmail
                ? { email: value }
                : { mobile: value };

            const result = await api(
                "/auth/forgot-password",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                }
            );

            console.log(
                "Forgot password resend result:",
                result
            );

            setResendSeconds(result.retryAfter || 60);

            setOtp([
                "",
                "",
                "",
                "",
                "",
                "",
            ]);

            setSuccess(
                "A new OTP has been sent."
            );

        } catch (error) {

            console.error(
                "Resend OTP error:",
                error
            );

            setError(
                error.message ||
                "Unable to resend OTP."
            );

        } finally {

            setResendLoading(false);

        }

    };

    const handleUpdatePassword = async () => {

        setError("");
        setSuccess("");

        if (!newPassword.trim()) {

            setError(
                "Please enter a new password."
            );

            return;

        }

        if (!confirmPassword.trim()) {

            setError(
                "Please confirm your new password."
            );

            return;

        }

        if (newPassword !== confirmPassword) {

            setError(
                "Passwords do not match."
            );

            return;

        }

        try {

            setLoading(true);

            const value = identifier.trim();

            const isEmail = value.includes("@");

            const body = isEmail
                ? {
                    email: value,
                    newPassword,
                  }
                : {
                    mobile: value,
                    newPassword,
                  };

            const result = await api(
                "/auth/reset-password",
                {
                    method: "POST",
                    body: JSON.stringify(body),
                }
            );

            console.log(
                "Password reset response:",
                result
            );

            setSuccess(
                "Password updated successfully."
            );

            setTimeout(() => {

                navigate("/login", {
                    replace: true,
                });

            }, 1000);

        } catch (error) {

            console.error(
                "Password reset error:",
                error
            );

            setError(
                error.message ||
                "Unable to reset password."
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <PageLayout>

            <div className="forgot-password">

                {error && (

                    <div className="forgot-error">
                        {error}
                    </div>

                )}

                {success && (

                    <div className="forgot-success">
                        {success}
                    </div>

                )}

                {step === 1 && (

                    <>

                        <h1>
                            Forgot Password
                        </h1>

                        <p>
                            Enter your registered
                            mobile number or email.
                        </p>

                        <label>
                            Mobile Number or Email
                        </label>

                        <input
                            className="forgot-input"
                            type="text"
                            placeholder="+91 9876543210"
                            value={identifier}
                            onChange={(e) => {

                                setIdentifier(e.target.value);
                                setError("");
                                setSuccess("");

                            }}
                        />

                        <button
                            className="forgot-btn"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >

                            {loading
                                ? "Sending..."
                                : "Continue"
                            }

                        </button>

                    </>

                )}

                {step === 2 && (

                    <>

                        <h1>
                            Verify Account
                        </h1>

                        <p>
                            Enter the verification code sent
                            to your mobile number or email.
                        </p>

                        <label>
                            Verification Code
                        </label>

                        <div className="otp-container">

                            {[0, 1, 2, 3, 4, 5].map(
                                (i) => (

                                    <input
                                        key={i}
                                        ref={(el) =>
                                            otpRefs.current[i] = el
                                        }
                                        className="otp-box"
                                        type="text"
                                        inputMode="numeric"
                                        maxLength="1"
                                        value={otp[i]}
                                        onChange={(e) =>
                                            handleOtpChange(e, i)
                                        }
                                        onKeyDown={(e) =>
                                            handleOtpKeyDown(e, i)
                                        }
                                    />

                                )
                            )}

                        </div>

                        <p className="otp-text">
                            Didn't receive the OTP?
                        </p>

                        <button
                            className="resend-btn"
                            onClick={handleResendOtp}
                            disabled={
                                resendSeconds > 0 ||
                                resendLoading
                            }
                        >

                            {resendLoading
                                ? "Sending..."
                                : resendSeconds > 0
                                ? `Resend OTP in ${resendSeconds}s`
                                : "Resend OTP"
                            }

                        </button>

                        <button
                            className="forgot-btn"
                            onClick={handleVerifyOtp}
                            disabled={loading}
                        >

                            {loading
                                ? "Verifying..."
                                : "Verify"
                            }

                        </button>

                    </>

                )}

                {step === 3 && (

                    <>

                        <h1>
                            Create New Password
                        </h1>

                        <p>
                            Choose a new password for
                            your account.
                        </p>

                        <label>
                            New Password
                        </label>

                        <input
                            className="forgot-input"
                            type="password"
                            placeholder="Enter New Password"
                            value={newPassword}
                            onChange={(e) => {

                                setNewPassword(e.target.value);
                                setError("");
                                setSuccess("");

                            }}
                        />

                        <label>
                            Confirm Password
                        </label>

                        <input
                            className="forgot-input"
                            type="password"
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) => {

                                setConfirmPassword(e.target.value);
                                setError("");
                                setSuccess("");

                            }}
                        />

                        <button
                            className="forgot-btn"
                            onClick={handleUpdatePassword}
                            disabled={loading}
                        >

                            {loading
                                ? "Updating..."
                                : "Update Password"
                            }

                        </button>

                    </>

                )}

            </div>

        </PageLayout>

    );

}

export default ForgotPassword;
