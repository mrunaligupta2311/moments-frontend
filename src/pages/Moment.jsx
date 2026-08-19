 import "./Moment.css";
import PageLayout from "../layouts/PageLayout";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaEllipsisV,
    FaEdit
} from "react-icons/fa";

import { api } from "../services/api";

function Moment() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [menuOpen, setMenuOpen] = useState(false);
    const [moment, setMoment] = useState(null);

    useEffect(() => {

        const loadMoment = async () => {

            try {

                const result = await api(`/moments/${id}`);

                console.log("Moment:", result);

                setMoment(result.data);

            } catch (error) {

                console.error("Failed to load moment:", error);

            }

        };

        loadMoment();

    }, [id]);

    if (!moment) {

        return (

            <PageLayout centered={false}>

                <div className="moment">

                    Loading...

                </div>

            </PageLayout>

        );

    }

    return (

        <PageLayout

            centered={false}

            leftAction={

                <div className="menu-wrapper">

                    <button

                        className="menu-btn"

                        onClick={() => setMenuOpen(!menuOpen)}

                    >

                        <FaEllipsisV />

                    </button>

                    {

                        menuOpen && (

                            <div className="menu">

                                <button

                                    onClick={() =>
                                        navigate(`/edit-moment/${moment.id}`)
                                    }

                                >

                                    <FaEdit />

                                    <span>

                                        Edit Moment

                                    </span>

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

                        {moment.date}

                    </span>

                </div>

                <h1>

                    {moment.title}

                </h1>

                <div className="content">

                    {

                        moment.description && (

                            <p>

                                {moment.description}

                            </p>

                        )

                    }

                </div>

            </div>

        </PageLayout>

    );

}

export default Moment;