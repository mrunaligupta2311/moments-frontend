import "./EditMoment.css";
import PageLayout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";

function EditMoment() {

    const navigate = useNavigate();

    return (

        <PageLayout centered={false}>

            <div className="edit-moment">

                <div className="top-bar">

                    <input

                        type="text"

                        className="date-input"

                        defaultValue="23 Jul 2021"

                    />

                </div>

                <h1>Edit Moment</h1>

                <label>Title</label>

                <input

                    className="title-input"

                    type="text"

                    defaultValue="My 20th Birthday"

                />

                <label>Description</label>

                <textarea

                    className="description"

                    defaultValue={`Today was one of the happiest days of my life.

Mom surprised me with a beautiful cake and all my friends secretly planned a celebration for me.

I don't think I'll ever forget this day.`}

                />

                <button

                    className="save-btn"

                    onClick={() => navigate("/moment")}

                >

                    Save Changes

                </button>

            </div>

        </PageLayout>

    );

}

export default EditMoment;