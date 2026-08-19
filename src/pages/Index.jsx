import "./Index.css";
import PageLayout from "../layouts/PageLayout";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../services/api";

function Index() {

    const navigate = useNavigate();
const [moments, setMoments] = useState([]);

   


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

  loadMoments();
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

        </PageLayout>

    );

}

export default Index;