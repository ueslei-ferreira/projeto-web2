import React from "react";
import "../styles/features.css";

function Features() {
  return (
    <section className="features">
      <div className="feature">
        <i className="fas fa-clock"></i>
        <h3>Atendimento Rápido</h3>
        <p>Conecte-se com um profissional em minutos.</p>
      </div>
      <div className="feature">
        <i className="fas fa-shield-alt"></i>
        <h3>Segurança Garantida</h3>
        <p>Pagamentos seguros com PIX e Boleto.</p>
      </div>
      <div className="feature">
        <i className="fas fa-thumbs-up"></i>
        <h3>Clientes Satisfeitos</h3>
        <p>Mais de 69 Bikudos satisfeitos.</p>
      </div>
    </section>
  );
}

export default Features;
