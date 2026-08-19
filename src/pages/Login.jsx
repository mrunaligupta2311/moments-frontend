import "./Login.css";
import PageLayout from "../layouts/PageLayout";
import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { api } from "../services/api";
import { showGlobalNotification } from "../services/notification";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Login() {
const [email, setEmail] = useState("");
const [mobile, setMobile] = useState("");
const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);

    return (

        <PageLayout showBack={false}>

            <div className="login">

                <h1>Welcome Back</h1>

                <p>

                    Sign in to continue your journey.

                </p>

                <div className="input-box">

                    <FaUser className="icon"/>

                    

<input
    type="text"
    placeholder="Email or Mobile Number"
    value={email || mobile}
    onChange={(e) => {
        const value = e.target.value;

        if (value.includes("@")) {
            setEmail(value);
            setMobile("");
        } else {
            setMobile(value);
            setEmail("");
        }
    }}
/>

                </div>

                <div className="input-box">

                    <FaLock className="icon"/>
<input
    type={showPassword ? "text" : "password"}
    placeholder="Password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
/>

                    <button

                        type="button"

                        className="eye-btn"

                        onClick={() => setShowPassword(!showPassword)}

                    >

                        {

                            showPassword ?

                            <FaEyeSlash/>

                            :

                            <FaEye/>

                        }

                    </button>

                </div>

                <button

                    className="continue-btn"

                  
                    onClick={async () => {
    try {
        const result = await api("/auth/login", {
            method: "POST",
            body: JSON.stringify({
                email: email || null,
                mobile: mobile || null,
                password,
            }),
        });

        localStorage.setItem("token", result.data.token);
localStorage.setItem("userId", result.data.id);
        navigate("/password");
   } catch (error) {
  console.error("Login error:", error);

  if (error.message === "Please verify your account first.") {
    showGlobalNotification(
      error.message,
      "warning",

    () => navigate("/signup", {
  state: {
    step: 3,
    userId: error.userId,
  },
})

    );
    return;
  }

  showGlobalNotification(error.message, "error");
}
}}


                >

                    Continue

                </button>

                <button

                    className="forgot-btn"

                    onClick={() => navigate("/forgot-password")}

                >

                    Forgot Password?

                </button>

                <div className="divider">

                    <span></span>

                    <p>or</p>

                    <span></span>

                </div>

                <button

                    className="signup-btn"

                    onClick={() => navigate("/signup")}

                >

                    Create New Account

                </button>

            </div>

        </PageLayout>

    );

}

export default Login;