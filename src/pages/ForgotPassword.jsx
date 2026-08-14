import "./ForgotPassword.css";
import PageLayout from "../layouts/PageLayout";

import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {

    const navigate = useNavigate();

    const [step, setStep] = useState(1);

    const otpRefs = useRef([]);

    const handleOtpChange = (e, index) => {

        const value = e.target.value;

        if (!/^[0-9]?$/.test(value)) return;

        e.target.value = value;

        if (value && index < 5) {

            otpRefs.current[index + 1].focus();

        }

    };

    const handleOtpKeyDown = (e, index) => {

        if (

            e.key === "Backspace" &&
            !e.target.value &&
            index > 0

        ) {

            otpRefs.current[index - 1].focus();

        }

    };

    return(

        <PageLayout>

            <div className="forgot-password">

                {

                    step===1 && (

                        <>

                            <h1>Forgot Password</h1>

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

                            />

                            <button

                                className="forgot-btn"

                                onClick={()=>setStep(2)}

                            >

                                Continue

                            </button>

                        </>

                    )

                }

                {

                    step===2 && (

                        <>

                            <h1>Verify Account</h1>

                            <p>

                                Enter the verification code sent
                                to your mobile number or email.

                            </p>

                            <label>

                                Verification Code

                            </label>

                            <div className="otp-container">

                                {

                                    [0,1,2,3,4,5].map((i)=>(

                                        <input

                                            key={i}

                                            ref={(el)=>otpRefs.current[i]=el}

                                            className="otp-box"

                                            type="text"

                                            inputMode="numeric"

                                            maxLength="1"

                                            onChange={(e)=>handleOtpChange(e,i)}

                                            onKeyDown={(e)=>handleOtpKeyDown(e,i)}

                                        />

                                    ))

                                }

                            </div>

                            <p className="otp-text">

                                Didn't receive the verification code?

                            </p>

                            <button

                                className="resend-btn"

                            >

                                Resend Code

                            </button>

                            <button

                                className="forgot-btn"

                                onClick={()=>setStep(3)}

                            >

                                Verify

                            </button>

                        </>

                    )

                }

                {

                    step===3 && (

                        <>

                            <h1>Create New Password</h1>

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

                            />

                            <label>

                                Confirm Password

                            </label>

                            <input

                                className="forgot-input"

                                type="password"

                                placeholder="Re-enter Password"

                            />

                            <button

                                className="forgot-btn"

                                onClick={() => {

    navigate("/login");

}}

                            >

                                Update Password

                            </button>

                        </>

                    )

                }

            </div>

        </PageLayout>

    );

}

export default ForgotPassword;