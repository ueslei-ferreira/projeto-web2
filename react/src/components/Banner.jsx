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
        <h1>Comece imediatamente:</h1>
        <div className="main-links">
          <Link to="/servicos">
            <div className="option">Procurar Prestadores</div>
          </Link>
          <Link to="/cadastro/prestadores">
            <div className="option">Prestar Serviços</div>
          </Link>
          <Link to="/cadastro/trabalhos">
            <div className="option">Cadastre um trabalho</div>
          </Link>
          <Link to="/trabalhos">
            <div className="option">Trabalhos disponíveis</div>
          </Link>
        </div>
      </div>
    </section>
  );
}


export default Banner;
