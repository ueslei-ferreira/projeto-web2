import React from "react";
import "../styles/banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <a href="/contratar-servico">
          <div className="option">Contratar Serviço</div>
        </a>
        <a href="/cadastrar-servico">
          <div className="option">Cadastrar Serviço</div>
        </a>
      </div>
    </section>
  );
}

export default Banner;
