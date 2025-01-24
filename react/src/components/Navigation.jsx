import React from "react";
import "../styles/navigation.css";
import { Link } from "react-router-dom";
import { FaClipboard, FaListUl, FaServicestack, FaHome, FaUser, FaRegCalendarAlt } from "react-icons/fa"; // Importa ícones da biblioteca react-icons

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
        <Link to="/cadastro/prestadores">
          <FaClipboard className="nav-icon" />
          <span>Cadastrar Trabalho</span>
        </Link>
        <Link to="/meus/trabalhos">
          <FaRegCalendarAlt className="nav-icon" />
          <span>Sua Agenda</span>
        </Link>
        <Link to="/perfil">
          <FaUser className="nav-icon" />
          <span>Meu Perfil</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
