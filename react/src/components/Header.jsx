import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/header.css";
import logo from "../images/logofalkao.ico";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const updateLoginStatus = () => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    updateLoginStatus();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    updateLoginStatus();
    navigate("/");
  };

  return (
    <header>
      <div className="logo">
        <Link to="/" className="logo-link">
          <img src={logo} alt="Logo" />
          <h1>BikoJob</h1>
        </Link>
      </div>
      <div className="search-bar">
        <i className="fas fa-search"></i>
        <input type="text" placeholder="Feedback" />
      </div>
      <div className="options">
        <div
          className="atendimento"
          onMouseEnter={() => setShowPopup(true)}
          onMouseLeave={() => setShowPopup(false)}
        >
          <button className="atendimento-button">
            <i className="fas fa-headset"></i> Atendimento
          </button>
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
                
        <div className="logs">
          {localStorage.getItem("token") ? (
            <button onClick={handleLogout} className="logout-button">
              <i className="fas fa-sign-out-alt"></i> Sair
            </button>
          ) : (
            <Link to="/cadastro" className="login-link">
              <i className="fas fa-user"></i> Entrar ou Cadastrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
