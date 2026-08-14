import "./PageLayout.css";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function PageLayout({

    children,
    showBack = true,
    leftAction = null,
    centered = true

}) {

    const navigate = useNavigate();

    return (

        <div
            className={`page ${
                centered ? "page-center" : "page-top"
            }`}
        >

            {

                showBack && (

                    <button

                        className="layout-back-btn"

                        onClick={() => navigate(-1)}

                    >

                        <FaArrowLeft />

                    </button>

                )

            }

            {

                leftAction && (

                    <div className="layout-left-action">

                        {leftAction}

                    </div>

                )

            }

            <div className="card">

                {children}

            </div>

        </div>

    );

}

export default PageLayout;