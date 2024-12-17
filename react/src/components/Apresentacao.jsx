import React from "react";
import "../styles/apresentacao.css";

function Apresentar() {
  return (
    <section className="apresentar-section">
      {/* Seção de Introdução */}
      <section className="intro-section">
        <div className="intro-content">
          <div className="intro-text">
            <h1>Bem-vindo ao BikoJob</h1>
            <p>
              Nossa missão é conectar clientes e prestadores de serviços de maneira
              eficiente, segura e confiável. Facilitamos o acesso a serviços como
              eletricidade, encanamento e marcenaria, trazendo praticidade para
              você e sua casa.
            </p>
          </div>
          <div className="intro-image">
            <img
              src="placeholder.jpg"
              alt="Pessoa usando celular para buscar serviços"
            />
          </div>
        </div>
      </section>

      {/* Seção de Principais Funcionalidades */}
      <section className="features-section">
        <h2>Principais Funcionalidades</h2>
        <div className="features-content">
          <div className="feature">
            <img src="search-icon.png" alt="Busca de Serviços" />
            <p>Encontre serviços próximos a você com facilidade.</p>
          </div>
          <div className="feature">
            <img src="calendar-icon.png" alt="Agendamento" />
            <p>Agende serviços de acordo com sua disponibilidade.</p>
          </div>
          <div className="feature">
            <img src="professional-icon.png" alt="Profissionais Verificados" />
            <p>Trabalhe com profissionais avaliados e confiáveis.</p>
          </div>
        </div>
      </section>

      {/* Seção de Como Funciona */}
      <section className="steps-section">
        <h2>Como Funciona o BikoJob</h2>
        <div className="steps-content">
          <div className="step">
            <span className="step-number">1</span>
            <p>Cadastre-se preenchendo o formulário no site ou app.</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <p>Busque serviços usando nossa ferramenta de busca.</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <p>Contrate profissionais e receba o serviço em sua casa.</p>
          </div>
          <div className="step">
            <span className="step-number">4</span>
            <p>Avalie o serviço com nosso sistema de estrelas.</p>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Apresentar;
