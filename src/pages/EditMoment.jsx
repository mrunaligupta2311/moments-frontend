 import "./EditMoment.css";
import PageLayout from "../layouts/PageLayout";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../services/api";

function EditMoment() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [date, setDate] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {

        const loadMoment = async () => {

            try {

                const result = await api(`/moments/${id}`);

                console.log("Edit Moment:", result);

                const moment = result.data;

                setDate(moment.date || "");
                setTitle(moment.title || "");
                setDescription(moment.description || "");

            } catch (error) {

                console.error("Failed to load moment:", error);

            }

        };

        loadMoment();

    }, [id]);

    const handleSave = async () => {

        if (!title.trim() || !date.trim()) {

            console.log("Please enter title and date");

            return;

        }

        try {

            const result = await api(`/moments/${id}`, {

                method: "PUT",

                body: JSON.stringify({

                    title,
                    description,
                    date,

                }),

            });

            console.log("Updated Moment:", result);

           navigate(`/moment/${id}`, { replace: true });
           
        } catch (error) {

            console.error("Update moment error:", error);

        }

    };

    return (

        <PageLayout centered={false}>

            <div className="edit-moment">

                <div className="top-bar">

                    <input

                        type="text"

                        className="date-input"

                        placeholder="23 Jul 2026"

                        value={date}

                        onChange={(e) => setDate(e.target.value)}

                    />

                </div>

                <h1>

                    Edit Moment

                </h1>

                <label>

                    Title

                </label>

                <input

                    className="title-input"

                    type="text"

                    placeholder="My 20th Birthday"

                    value={title}

                    onChange={(e) => setTitle(e.target.value)}

                />

                <label>

                    Description

                </label>

                <textarea

                    className="description"

                    placeholder="Write your moment..."

                    value={description}

                    onChange={(e) => setDescription(e.target.value)}

                />

                <button

                    className="save-btn"

                    onClick={handleSave}

                >

                    Save Changes

                </button>

            </div>

        </PageLayout>

    );

}

export default EditMoment;