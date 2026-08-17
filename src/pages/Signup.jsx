import "./Signup.css";
import PageLayout from "../layouts/PageLayout";
import { api } from "../services/api";


import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

   const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    mobile: "",
    password: "",
});
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
    onChange={(e) =>
        setFormData({
            ...formData,
            fullName: e.target.value
        })
    }
/>

                            <label>Username</label>

                            <input
value={formData.username}
onChange={(e) =>
    setFormData({
        ...formData,
        username: e.target.value
    })
}

                                className="signup-input"

                                type="text"

                                placeholder="@mrunali"

                            />

                            <label>Mobile Number</label>
<input
    value={formData.mobile}
    onChange={(e) =>
        setFormData({
            ...formData,
            mobile: e.target.value
        })
    }
    className="signup-input"
    type="tel"
    placeholder="9876543210"
/>
<div className="signup-or">Or you can continue with</div>

<label>Email</label>
<input
    value={formData.email}
    onChange={(e) =>
        setFormData({
            ...formData,
            email: e.target.value
        })
    }
    className="signup-input"
    type="email"
    placeholder="mrunali@example.com"
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
value={formData.password}
onChange={(e) =>
    setFormData({
        ...formData,
        password: e.target.value
    })
}

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

              
                onClick={async () => {
    try {
        const result = await api("/auth/signup", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        console.log("Signup response:", result);
        setStep(3);
    } catch (error) {
        console.error("Signup error:", error);
        alert(error.message);
    }
}}

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