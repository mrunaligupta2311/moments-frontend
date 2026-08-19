import "./Index.css";
import PageLayout from "../layouts/PageLayout";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function Index() {

    const navigate = useNavigate();
const [moments, setMoments] = useState([]);
const [exitPopup, setExitPopup] = useState(false);

   

useEffect(() => {

    const loadMoments = async () => {
        try {
            const result = await api("/moments");
            console.log("Moments:", result);
            setMoments(result.data);
        } catch (error) {
            console.error("Failed to load moments:", error);
        }
    };
window.history.pushState({ indexPage: true }, "", "/index");

   const handlePopState = () => {
    window.history.pushState({ indexPage: true }, "", "/index");
    setExitPopup(true);
};

    window.addEventListener("popstate", handlePopState);

    loadMoments();

    return () => {
        window.removeEventListener("popstate", handlePopState);
    };

}, []);

    return(

        <PageLayout
    centered={false}
    showBack={false}
>

            <div className="index">

                <header className="header">

                    <h1>Moments</h1>

                    <p>

                        The Important Moments

                        <br/>

                        of My Life

                    </p>

                </header>

                <section className="index-list">

                   
                 {  moments.map((moment, index) => {
  console.log("INDEX MOMENT DATE:", moment.date);

  return (

                    <div
    key={moment.id}
    className="index-row"
    onClick={() => navigate(`/moment/${moment.id}`)}
  >
    <span className="sr">
   {String(index + 1).padStart(2, "0")}.
     </span>

    <span className="title">
      {moment.title}
    </span>

    <span className="dots"></span>

    <span className="date">

      {moment.date}
    </span>
  </div>
); })}

                </section>

                <button

                    className="new-btn"

                    onClick={()=>navigate("/NewMoment")}

                >

                    <FaPlus/>

                    <span>New Moment</span>

                </button>

            </div>



{exitPopup && (

    <div className="exit-popup-overlay">

        <div className="exit-popup">

            <h2>
                Are you sure you want to exit the app?
            </h2>

            <div className="exit-popup-actions">

                <button
                    onClick={() => setExitPopup(false)}
                >
                    No
                </button>

                <button
                    onClick={() => window.close()}
                >
                    Yes
                </button>

            </div>

        </div>

    </div>

)}


        </PageLayout>

    );

}

export default Index;