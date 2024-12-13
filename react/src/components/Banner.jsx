import React from "react";
import { Link } from "react-router-dom";
import "../styles/banner.css";
import Apresentar from "./Apresentacao";
function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <div className="intro-image">
          <Apresentar />
        </div>
        <Link to="/servicos">
          <div className="option">Procurar Serviços</div>
        </Link>
        <Link to="/cadastro/prestadores">
          <div className="option">Prestar Serviços</div>
        </Link>
      </div>
    </section>
  );
}


export default Banner;
