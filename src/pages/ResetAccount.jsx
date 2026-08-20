 import "./ResetAccount.css";
import PageLayout from "../layouts/PageLayout";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";

function ResetAccount() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const [confirmed, setConfirmed] = useState(false);
    
    const [otp, setOtp] = useState("");
const [showSuccess, setShowSuccess] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const otpRefs = useRef([]);

    // --------------------------------------------------
    // STEP 1 → REQUEST ACCOUNT RESET
    // --------------------------------------------------

    const handleResetAccount = async () => {

        try {

            setLoading(true);
            setError("");

            const userId = localStorage.getItem("userId");

            if (!userId) {
                setError("User session not found.");
                return;
            }

            await api("/auth/reset-account", {
                method: "POST",
                body: JSON.stringify({
                    userId,
                }),
            });

            // OTP successfully sent
            setStep(2);

        } catch (error) {

            setError(
                error.message ||
                "Unable to reset account."
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // OTP INPUT
    // --------------------------------------------------

    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        const newOtp = otp.split("");

        newOtp[index] = value;

        setOtp(newOtp.join(""));

        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };


    const handleOtpKeyDown = (e, index) => {

        if (
            e.key === "Backspace" &&
            !e.target.value &&
            index > 0
        ) {

            otpRefs.current[index - 1]?.focus();

        }
    };


    // --------------------------------------------------
    // STEP 2 → VERIFY RESET OTP
    // --------------------------------------------------

    const handleVerifyOTP = async () => {

        try {

            setLoading(true);
            setError("");

            const userId =
                localStorage.getItem("userId");

            if (!userId) {
                setError("User session not found.");
                return;
            }

            if (otp.length !== 6) {
                setError("Please enter the complete OTP.");
                return;
            }

            await api("/auth/verify-reset-account-otp", {
                method: "POST",
                body: JSON.stringify({
                    userId,
                    otp,
                }),
            });

            // Account reset successful.
            // Directly open Signup Step 4.

           setShowSuccess(true);

        } catch (error) {

            setError(
                error.message ||
                "Invalid or expired OTP."
            );

        } finally {

            setLoading(false);

        }
    };


    // --------------------------------------------------
    // UI
    // --------------------------------------------------

    return (

        <PageLayout>

            <div className="reset-account">

                {step === 1 && (

                    <>

                        <h1>Reset Account</h1>

                        <p>
                            Are you sure you want to reset your account?
                            <br />
                            This action cannot be undone.
                        </p>

                        <div className="reset-warning">

                            <strong>Important</strong>

                            <br />

                            Resetting your account will remove your
                            current account access and reset your
                            Personal Space password.

                            <br /><br />

                            You will need to verify your identity
                            before setting up your Personal Space again.

                        </div>

                        {error && (
                            <div className="reset-error">
                                {error}
                            </div>
                        )}

                        <div className="reset-checkbox">

                            <input
                                type="checkbox"
                                checked={confirmed}
                                onChange={(e) =>
                                    setConfirmed(
                                        e.target.checked
                                    )
                                }
                            />

                            <span>
                                Yes, I understand that this action
                                cannot be undone and I want to
                                reset my account.
                            </span>

                        </div>

                        <button
                            className="reset-btn"
                            disabled={
                                !confirmed ||
                                loading
                            }
                            onClick={
                                handleResetAccount
                            }
                        >

                            {loading
                                ? "Sending OTP..."
                                : "Reset My Account"
                            }

                        </button>

                    </>

                )}


                {step === 2 && (

                    <>

                        <h1>Verify Your Account</h1>

                        <p>
                            We've sent a verification code
                            <br />
                            to your registered mobile number
                            or email.
                        </p>

                        {error && (
                            <div className="reset-error">
                                {error}
                            </div>
                        )}

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
                                        value={
                                            otp[i] || ""
                                        }
                                        onChange={(e) =>
                                            handleOtpChange(
                                                e,
                                                i
                                            )
                                        }
                                        onKeyDown={(e) =>
                                            handleOtpKeyDown(
                                                e,
                                                i
                                            )
                                        }
                                    />

                                )
                            )}

                        </div>

                        <p className="otp-text">
                            Enter the 6-digit OTP sent to
                            your registered contact.
                        </p>

                        <button
                            className="reset-btn"
                            disabled={
                                otp.length !== 6 ||
                                loading
                            }
                            onClick={
                                handleVerifyOTP
                            }
                        >

                            {loading
                                ? "Verifying..."
                                : "Verify OTP"
                            }

                        </button>

                    </>

                )}

            </div>
{showSuccess && (
    <div className="success-popup">
        <div className="success-popup-content">

            <h2>Account Reset Successful ✨</h2>

            <p>
                Your account has been reset successfully.
                You can now create your Personal Space again.
            </p>

            <button
                onClick={() =>
                    navigate("/signup", {
                        state: {
                            step: 4,
                            userId: localStorage.getItem("userId"),
                        },
                    })
                }
            >
                OK
            </button>

        </div>
    </div>
)}

        </PageLayout>

    );

}

export default ResetAccount;