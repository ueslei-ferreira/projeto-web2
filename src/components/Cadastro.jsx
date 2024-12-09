import React from "react";
import Header from "../components/Header";
import "../styles/cadastro.css";

function Cadastro() {
  return (
    <div>
      {/* Barra de navegação */}
      {/* Tela de Identificação */}
      <div className="container">
        <h2>IDENTIFICAÇÃO</h2>
        <p>Faça seu login ou crie uma conta caso ainda não possua cadastro</p>

        <div className="identificacao">
          {/* Login */}
          <div className="login-box">
            <h3><i className="fas fa-sign-in-alt"></i> JÁ SOU CADASTRADO</h3>
            <form>
              <label htmlFor="email">E-mail:</label>
              <input type="email" id="email" placeholder="Digite seu e-mail" />
              <label htmlFor="senha">Senha:</label>
              <input type="password" id="senha" placeholder="Digite sua senha" />
              <button type="submit" className="btn">Prosseguir</button>
              
    
            </form>
          </div>

          {/* Cadastro */}
          <div className="cadastro-box">
            <h3><i className="fas fa-user-plus"></i> AINDA NÃO POSSUO CADASTRO</h3>
            <form>
              <label htmlFor="novo-email">Digite o e-mail que deseja cadastrar:</label>
              <input type="email" id="novo-email" placeholder="Digite seu e-mail" />

              <label htmlFor="senha">Digite o e-mail que deseja cadastrar:</label>
              <input type="password" id="nova-senha" placeholder="Digite sua senha" />

              <label htmlFor="senha">Digite novamente sua senha:</label>
              <input type="password" id="nova-senha" placeholder="Digite sua senha" />

              <button type="submit" className="btn cadastro-btn">Cadastrar</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
