import "./Splash.css";
import PageLayout from "../layouts/PageLayout";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Splash() {

    const navigate = useNavigate();

    useEffect(() => {

        const timer = setTimeout(() => {

            navigate("/login");

        }, 1500);

        return () => clearTimeout(timer);

    }, [navigate]);

    return (

        <PageLayout showBack={false}>

            <div className="splash">

                <div className="overlay">

                    <h1>Moments</h1>

                    <p>

                        Every moment deserves

                        <br/>

                        to be remembered.

                    </p>

                </div>

            </div>

        </PageLayout>

    );

}

export default Splash;