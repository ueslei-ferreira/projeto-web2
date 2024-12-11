import React from "react";
import Navigation from "./Navigation";
import Banner from "./Banner";
import Features from "./Features";
import "../styles/style.css";
function Home(){
    return (
      <div className="page">
        <Navigation />
        <div className="content">
          <Banner />
          <Features />
        </div>
      </div>
      );
}

export default Home;