import "./Password.css";
import PageLayout from "../layouts/PageLayout";
import { api } from "../services/api";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa";

function Password() {

    const navigate = useNavigate();

    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleContinue = async () => {
    try {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            setError("User session not found");
            return;
        }

        await api("/auth/verify-personal-password", {
            method: "POST",
            body: JSON.stringify({
                userId,
                personalPassword: password,
            }),
        });

        navigate("/index");

    } catch (error) {
        setError(error.message);
    }
};
    return (

        <PageLayout>

            <div className="password">

                <FaLock className="lock-icon"/>

                <p className="password-text">

                    Welcome to your personal space.

                    <br/>

                    Enter your password to continue.

                </p>

                <div className="input-box">

                    <FaLock className="icon"/>

                    <input

                        type={showPassword ? "text" : "password"}

                        placeholder="Password"

                        value={password}

                        onChange={(e)=>{

                            setPassword(e.target.value);

                            setError("");

                        }}

                        onKeyDown={(e)=>{

                            if(e.key==="Enter"){

                                handleContinue();

                            }

                        }}

                    />

                    <button

                        type="button"

                        className="eye-btn"

                        onClick={()=>setShowPassword(!showPassword)}

                    >

                        {

                            showPassword ?

                            <FaEyeSlash/>

                            :

                            <FaEye/>

                        }

                    </button>

                </div>

                {

                    error &&

                    <div className="error">

                        {error}

                    </div>

                }

                <button

                    className="continue-btn"

                    onClick={handleContinue}

                >

                    Continue

                </button>

            </div>

        </PageLayout>

    );

}

export default Password;