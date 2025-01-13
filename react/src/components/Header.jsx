import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/header.css";
import logo from "../images/logofalkao.ico";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // Adicionando o estado showPopup

  useEffect(() => {
    // Verifica se existe um token no localStorage para determinar o status de login
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Define como true se o token existir
  }, []);

  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link"> {/* O Link redireciona para a página inicial */}
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
          <a>
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
        {/* Exibe o link de login/cadastro apenas se o usuário não estiver logado */}
        {!isLoggedIn && (
          <Link to="/cadastro">
            <i className="fas fa-user"></i> Entrar ou Cadastrar
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
