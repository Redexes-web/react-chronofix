import React, {Fragment} from "react";
import Slider from "../carousel/Slider";
import "bootstrap/dist/css/bootstrap.css";

const Home = () => {

    return (
       <Fragment>
           <h1>
               Bienvenue dans chroflix, postez et lisez des
               chroniques autant que vous voulez
           </h1>
           <div className="container">
               <Slider/>
           </div>
       </Fragment>
    )
}

export default Home;