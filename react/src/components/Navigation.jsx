import React from "react";
import "../styles/navigation.css";

function Navigation() {
  return (
    <nav>
      <a href="#">
        <i className="fas fa-home"></i> Início
      </a>
      <a href="#">
        <i className="fas fa-tools"></i> Serviços
      </a>
      <a href="#">
        <i className="fas fa-info-circle"></i> Sobre Nós
      </a>
      <a href="#">
        <i className="fas fa-phone"></i> Contato
      </a>
    </nav>
  );
}

export default Navigation;
