import "./Moment.css";
import PageLayout from "../layouts/PageLayout";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaEllipsisV,
    FaEdit
} from "react-icons/fa";

function Moment() {

    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    return (

        <PageLayout

            centered={false}

            leftAction={

                <div className="menu-wrapper">

                    <button

                        className="menu-btn"

                        onClick={() => setMenuOpen(!menuOpen)}

                    >

                        <FaEllipsisV/>

                    </button>

                    {

                        menuOpen && (

                            <div className="menu">

                                <button

                                    onClick={() => navigate("/edit-moment")}

                                >

                                    <FaEdit/>

                                    <span>Edit Moment</span>

                                </button>

                            </div>

                        )

                    }

                </div>

            }

        >

            <div className="moment">

                <div className="top-bar">

                    <span className="date">

                        23 Jul 2021

                    </span>

                </div>

                <h1>

                    My 20th Birthday

                </h1>

                <div className="content">

                    <p>

                        Today was one of the happiest days of my life.

                    </p>

                    <br/>

                    <p>

                        Mom surprised me with a beautiful cake and all my friends secretly planned a celebration for me.

                    </p>

                    <br/>

                    <p>

                        I don't think I'll ever forget this day.

                    </p>

                </div>

            </div>

        </PageLayout>

    );

}

export default Moment;