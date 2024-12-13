import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <nav>
      <Link to = "/">
        <i className="fas fa-home"></i> Início
      </Link>
      <Link to ="/servicos">
        <i className="fas fa-tools"></i> Serviços
      </Link>
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
