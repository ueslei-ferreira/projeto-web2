import React from "react";
import "../styles/apresentacao.css";
function Apresentar(){
    
    return (
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
              {/* Insira aqui a imagem ou ilustração */}
              <img
                src="placeholder.jpg"
                alt="Pessoa usando celular para buscar serviços"
              />
            </div>
          </div>
        </section>
      );

}
export default Apresentar;