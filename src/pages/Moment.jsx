 import "./Moment.css";
import PageLayout from "../layouts/PageLayout";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaEllipsisV,
    FaEdit,
    FaTrash
} from "react-icons/fa";

import { api } from "../services/api";

function Moment() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [menuOpen, setMenuOpen] = useState(false);
    const [moment, setMoment] = useState(null);
    const [showDeletePopup, setShowDeletePopup] = useState(false);

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

    const handleDelete = async () => {

        try {

            await api(`/moments/${id}`, {
                method: "DELETE",
            });

            navigate("/index", { replace: true });

        } catch (error) {

            console.error("Delete moment error:", error);

        }

    };

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

                                <button

                                    onClick={() => {
                                        setMenuOpen(false);
                                        setShowDeletePopup(true);
                                    }}

                                >

                                    <FaTrash />

                                    <span>

                                        Delete Moment

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

            {

                showDeletePopup && (

                    <div className="delete-popup-overlay">

                        <div className="delete-popup">

                            <h2>

                                Are you sure you want to delete your moment?

                            </h2>

                            <div className="delete-popup-actions">

                                <button

                                    onClick={() => setShowDeletePopup(false)}

                                >

                                    No

                                </button>

                                <button

                                    onClick={handleDelete}

                                >

                                    Yes

                                </button>

                            </div>

                        </div>

                    </div>

                )

            }

        </PageLayout>

    );

}

export default Moment;