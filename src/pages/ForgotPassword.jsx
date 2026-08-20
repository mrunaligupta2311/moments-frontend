 import "./ForgotPassword.css";
import PageLayout from "../layouts/PageLayout";

import { useState, useRef } from "react";
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
    ]);

    const [newPassword, setNewPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const [loading, setLoading] = useState(false);

    const otpRefs = useRef([]);

    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) {
            return;
        }

        const updatedOtp = [...otp];

        updatedOtp[index] = value;

        setOtp(updatedOtp);

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

    if (!value) {
        console.log(
            "Please enter your registered mobile number or email"
        );
        return;
    }

    try {

        setLoading(true);

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
            "Forgot password OTP response:",
            result
        );

        setStep(2);

    } catch (error) {

        console.error(
            "Forgot password error:",
            error
        );

    } finally {

        setLoading(false);

    }

};




const handleVerifyOtp = async () => {

    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {

        console.log(
            "Please enter the complete OTP"
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

    } catch (error) {

        console.error(
            "OTP verification error:",
            error
        );

    } finally {

        setLoading(false);

    }

};


const handleUpdatePassword = async () => {

    if (!newPassword.trim() || !confirmPassword.trim()) {
        console.log("Please enter both passwords");
        return;
    }

    if (newPassword !== confirmPassword) {
        console.log("Passwords do not match");
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

        navigate("/login", {
            replace: true,
        });

    } catch (error) {

        console.error(
            "Password reset error:",
            error
        );

    } finally {

        setLoading(false);

    }

};

    return (

        <PageLayout>

            <div className="forgot-password">

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
                            onChange={(e) =>
                                setIdentifier(e.target.value)
                            }
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
                            Didn't receive the verification code?
                        </p>

                        <button
                            className="resend-btn"
                            onClick={handleSendOtp}
                            disabled={loading}
                        >

                            Resend Code

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
                            onChange={(e) =>
                                setNewPassword(e.target.value)
                            }
                        />

                        <label>
                            Confirm Password
                        </label>

                        <input
                            className="forgot-input"
                            type="password"
                            placeholder="Re-enter Password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
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