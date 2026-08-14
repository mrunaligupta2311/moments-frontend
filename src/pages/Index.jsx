import "./Index.css";
import PageLayout from "../layouts/PageLayout";

import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Index() {

    const navigate = useNavigate();

    const moments = [

        {
            id:1,
            title:"My 20th Birthday",
            date:"23 Jul 2021"
        },

        {
            id:2,
            title:"College Admission",
            date:"10 Aug 2022"
        },

        {
            id:3,
            title:"First Job",
            date:"15 Jan 2025"
        }

    ];

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

                    {

                        moments.map((moment)=>(

                            <div

                                key={moment.id}

                                className="index-row"

                                onClick={()=>navigate("/moment")}

                            >

                                <span className="sr">

                                    {String(moment.id).padStart(2,"0")}.

                                </span>

                                <span className="title">

                                    {moment.title}

                                </span>

                                <span className="dots"></span>

                                <span className="date">

                                    {moment.date}

                                </span>

                            </div>

                        ))

                    }

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