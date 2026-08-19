import "./Signup.css";
import PageLayout from "../layouts/PageLayout";
import { api } from "../services/api";
import Notification from "../components/Notification";

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

  const [formData, setFormData] = useState({
  fullName: "",
  email: "",
  mobile: "",
  password: "",
  userId: initialUserId,
});

 const navigate = useNavigate();
const [confirmPassword, setConfirmPassword] = useState("");
const [notification, setNotification] = useState(null);
const [notificationType, setNotificationType] = useState("error");

const location = useLocation();

const initialStep = location.state?.step || 1;
const initialUserId = location.state?.userId || "";

const [step, setStep] = useState(initialStep);

const [otp, setOtp] = useState("");
const [personalPassword, setPersonalPassword] = useState("");
const [confirmPersonalPassword, setConfirmPersonalPassword] = useState("");
const [showSuccess, setShowSuccess] = useState(false);
const [resendSeconds, setResendSeconds] = useState(0);
const [resendLoading, setResendLoading] = useState(false);

    const otpRefs = useRef([]);
const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = otp.split("");
    newOtp[index] = value;
    setOtp(newOtp.join(""));

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
};
    }
    
  useEffect(() => {
  if (step !== 3 || resendSeconds <= 0) return;

  const timer = setTimeout(() => {
    setResendSeconds((prev) => prev - 1);
  }, 1000);

  return () => clearTimeout(timer);
}, [step, resendSeconds]);


    return(

        <PageLayout>
{notification && (
  <Notification
    type={notificationType}
    message={notification}
    onClose={() => setNotification(null)}
  />
)}
        

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
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
/>


            <button

                className="signup-btn"

              
                onClick={async () => {
    try {

       if (formData.password !== confirmPassword) {
 
setNotificationType("error");
setNotification("Passwords do not match");
return;

}

if (!formData.password) {
  if (!formData.password) {
  setNotificationType("warning");
  setNotification("Please enter a password");
  return;
}
}
        const result = await api("/auth/signup", {
            method: "POST",
            body: JSON.stringify(formData),
        });

        setFormData({
    ...formData,
    userId: result.data.id
});
 console.log("Signup response:", result);
      setResendSeconds(30);
setStep(3);
   
} catch (error) {
    console.error("Signup error:", error);

    setNotificationType("error");
    setNotification(error.message);
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
  disabled={resendSeconds > 0 || resendLoading}
  onClick={async () => {
    try {
      setResendLoading(true);

   const result = await api("/auth/resend-otp", {
  method: "POST",
  body: JSON.stringify({
    userId: formData.userId,
  }),
});

console.log("Resend result:", result);

const nextDelay = {
 
  60: 120,
  120: 300,
  300: 600,
  600: 1800,
  1800: 86400,
}[result.retryAfter];

setResendSeconds(nextDelay || 86400);
setOtp("");


   } catch (error) {
  setNotificationType("error");
  setNotification(error.message);
} finally {
  setResendLoading(false);
}


  }}
>
  {resendLoading
    ? "Sending..."
    : resendSeconds > 0
    ? `Resend OTP in ${resendSeconds}s`
    : "Resend OTP"}
</button>





            <button

                className="signup-btn"

               onClick={async () => {
    try {
        const result = await api("/auth/verify-otp", {
            method: "POST",
            body: JSON.stringify({
                userId: formData.userId,
                otp,
            }),
        });

        console.log("OTP verification:", result);
     localStorage.setItem("token", result.data.token);

        setStep(4);
    } catch (error) {
  console.error("OTP verification error:", error);

  setNotificationType("error");
  setNotification(error.message);
}


}}

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
  value={personalPassword}
  onChange={(e) => setPersonalPassword(e.target.value)}
/>

            <label>Confirm Password</label>

           <input
  className="signup-input"
  type="password"
  placeholder="Re-enter Password"
  value={confirmPersonalPassword}
  onChange={(e) => setConfirmPersonalPassword(e.target.value)}
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

            onClick={async () => {
 if (personalPassword !== confirmPersonalPassword) {
  setNotificationType("error");
  setNotification("Passwords do not match");
  return;
}
if (!personalPassword) {
  setNotificationType("warning");
  setNotification("Please enter a personal password");
  return;
}


  try {
    const result = await api("/auth/set-personal-password", {
      method: "POST",
      body: JSON.stringify({
        userId: formData.userId,
        personalPassword,
      }),
    });

    console.log("Personal password:", result);
    setShowSuccess(true);
 
    } catch (error) {
  console.error("Personal password error:", error);

  setNotificationType("error");
  setNotification(error.message);
}
}} 
            >

                Create Account

            </button>
        </>

    )

}
            </div>
{showSuccess && (
  <div className="success-popup">
    <div className="success-popup-content">
     <h2>Welcome to Moments ✨</h2>
<p>Your account has been created successfully.</p>
 <button onClick={() => navigate("/login")}>
        Continue to Login
      </button>
    </div>
  </div>
)}
        </PageLayout>

    );

}

export default Signup;