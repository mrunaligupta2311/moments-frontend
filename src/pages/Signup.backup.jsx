import "./Signup.css";
import PageLayout from "../layouts/PageLayout";


import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

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

            <div className="signup">

                {

                    step===1 && (

                        <>

                            <h1>Create Account</h1>

                            <p>

                                Create your Moments account.

                            </p>

                            <label>Name</label>

                            <input

                                className="signup-input"

                                type="text"

                                placeholder="Mrunali Gupta"

                            />

                            <label>Username</label>

                            <input

                                className="signup-input"

                                type="text"

                                placeholder="@mrunali"

                            />

                            <label>Mobile Number or Email</label>

                            <input

                                className="signup-input"

                                type="text"

                                placeholder="+91 9876543210"

                            />

                            <button

                                className="signup-btn"

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

            <h1>Create Password</h1>

            <p>

                Create your account password.

            </p>

            <label>Password</label>

            <input

                className="signup-input"

                type="password"

                placeholder="Enter Password"

            />

            <label>Confirm Password</label>

            <input

                className="signup-input"

                type="password"

                placeholder="Re-enter Password"

            />

            <button

                className="signup-btn"

                onClick={()=>setStep(3)}

            >

                Continue

            </button>

        </>

    )

}  
{

    step===3 && (

        <>

            <h1>Verify Email / Mobile</h1>

            <p>

                We've sent a verification code
                <br/>
                to your mobile number or email.

            </p>
<div className="otp-container">

    {[0,1,2,3,4,5].map((i)=>(

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

    ))}

</div>  <p className="otp-text">

                Didn't receive the OTP?

            </p>

            <button

                className="resend-btn"

            >

                Resend OTP

            </button>

            <button

                className="signup-btn"

                onClick={()=>setStep(4)}

            >

                Verify

            </button>

        </>

    )

}
{

    step===4 && (

        <>

            <h1>Personal Space</h1>

            <p>

                Create a password to protect your
                private moments.

            </p>

            <div className="warning">

                This password cannot be recovered.
                <br/>
                If you forget it, you will permanently
                lose access to your personal space.

            </div>

            <label>Personal Space Password</label>

            <input

                className="signup-input"

                type="password"

                placeholder="Create Password"

            />

            <label>Confirm Password</label>

            <input

                className="signup-input"

                type="password"

                placeholder="Re-enter Password"

            />

            <label className="checkbox">

                <input type="checkbox"/>

                <span>

                    I understand this password
                    cannot be recovered.

                </span>

            </label>

            <button

                className="signup-btn"

                onClick={()=>navigate("/login")}

            >

                Create Account

            </button>

        </>

    )

}
            </div>

        </PageLayout>

    );

}

export default Signup;