import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../images/logofalkao.ico";

function Header() {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link">  {/* O Link redireciona para a página inicial */}
          <img src={logo} alt="Logo" />
          <h1>BikoJob</h1>
        </Link>
      </div>
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Feedback" />
      </div>
      <div className="user-options">
        {/* Atendimento com popup controlado por estado */}
        <div
          className="atendimento"
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <a href="#">
            <i className="fas fa-headset"></i> Atendimento
          </a>
          <div id="popup-atendimento" className={`popup ${showPopup ? "" : "oculto"}`}>
            <p>
              <i className="fas fa-phone"></i> Telefone: (89) 99431-0804
            </p>
            <p>
              <i className="fab fa-whatsapp"></i> Whatsapp: (89) 99431-0804
            </p>
            <p>
              <i className="fas fa-envelope"></i> E-mail: suporte@teste.com
            </p>
            <p>
              <i className="fas fa-clock"></i> Horário de Atendimento:
            </p>
            <p>Seg a Sex: 08h - 20h</p>
            <p>Sab: 08h - 17h</p>
            <p>Dom: Folga</p>
          </div>
        </div>
        {/* Navegação com Link */}
        <Link to="/cadastro">
          <i className="fas fa-user"></i> Entrar ou Cadastrar
        </Link>
      </div>
    </header>
  );
}

export default Header;
