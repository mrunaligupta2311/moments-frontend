import "./NewMoment.css";
import PageLayout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../services/api";

function NewMoment() {

const navigate = useNavigate();
const [date, setDate] = useState("");
const [title, setTitle] = useState("");
const [description, setDescription] = useState("");

    return (

        <PageLayout centered={false}>

            <div className="new-moment">

                <div className="top-bar">

                   <input
  type="text"
  className="date-input"
  placeholder="23 Jul 2026"
  value={date}
  onChange={(e) => setDate(e.target.value)}
/>


                </div>

                <h1>New Moment</h1>

                <label>Title</label>

               <input
  className="title-input"
  type="text"
  placeholder="My 20th Birthday"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
/>

                <label>Description</label>

               <textarea
  className="description"
  placeholder="Write your moment..."
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>


                <button

                    className="save-btn"

                  onClick={async () => {
 if (!title.trim() || !date.trim()) {
  console.log("Please enter title and date");
  return;
}
         
console.log("Saving moment:", { title, description, date });


try {
  const result = await api("/moments", {
    method: "POST",
    body: JSON.stringify({
      title,
      description,
      date,
    }),
  });

  console.log("CREATE MOMENT RESPONSE:", result);

  navigate("/index", { replace: true });
} catch (error) {
  console.error("Save moment error:", error);
}

}}

                >

                    Save Moment

                </button>

            </div>

        </PageLayout>

    );

}

export default NewMoment;