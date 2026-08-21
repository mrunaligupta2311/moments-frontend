import "./Index.css";
import PageLayout from "../layouts/PageLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { FaPlus, FaSignOutAlt } from "react-icons/fa";
function Index() {

    const navigate = useNavigate();
const [moments, setMoments] = useState([]);
const [logoutPopup, setLogoutPopup] = useState(false);
   

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

    window.history.pushState(null, "", "/index");

    const handlePopState = () => {
        window.history.pushState(null, "", "/index");
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
<button
    className="logout-icon-btn"
    onClick={() => setLogoutPopup(true)}
    aria-label="Logout"
>
    <FaSignOutAlt />
</button>


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


{logoutPopup && (
    <div className="logout-popup-overlay">
        <div className="logout-popup">
            <h2>Are you sure you want to logout?</h2>

            <div className="logout-popup-actions">

                <button
                    onClick={() => setLogoutPopup(false)}
                >
                    No
                </button>

                <button
                    onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("userId");
                        navigate("/login");
                    }}
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