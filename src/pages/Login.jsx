import "./Login.css";
import PageLayout from "../layouts/PageLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaUser,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Login() {

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

                        placeholder="Username or Mobile Number"

                    />

                </div>

                <div className="input-box">

                    <FaLock className="icon"/>

                    <input

                        type={showPassword ? "text" : "password"}

                        placeholder="Password"

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

                    onClick={() => navigate("/password")}

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