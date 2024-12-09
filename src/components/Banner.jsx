import React from "react";
import "../styles/banner.css";

function Banner() {
  return (
    <section className="banner">
      <div className="banner-content">
        <h2>Precisa de um serviço? Nós temos!</h2>
        <p>Encontre profissionais qualificados em diversas áreas, rápido e seguro.</p>
        <a href="#" className="cta-button">
          Entre em Contato
        </a>
      </div>
    </section>
  );
}

export default Banner;
