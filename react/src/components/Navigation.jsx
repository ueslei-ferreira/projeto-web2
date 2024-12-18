import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";
import { FaSearch, FaHandsHelping, FaClipboard, FaListUl, FaServicestack, FaHome } from "react-icons/fa"; // Importa ícones da biblioteca react-icons

function Navigation() {
  return (
    <nav>
      <div className="nav-links">
        <Link to="/">
          <FaHome className="nav-icon" />
          <span>Início</span>
        </Link>
        <Link to="/servicos">
          <FaServicestack className="nav-icon" />
          <span>Serviços</span>
        </Link>
        <Link to="/trabalhos">
          <FaSearch className="nav-icon" />
          <span>Procurar</span>
        </Link>
        <Link to="/cadastro/trabalhos">
          <FaHandsHelping className="nav-icon" />
          <span>Oferecer</span>
        </Link>
        <Link to="/cadastro/prestadores">
          <FaClipboard className="nav-icon" />
          <span>Prestadores</span>
        </Link>
        <Link to="/trabalhos">
          <FaListUl className="nav-icon" />
          <span>Trabalhos</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
