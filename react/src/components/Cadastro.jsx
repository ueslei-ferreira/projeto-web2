import React from "react";
import { useState } from 'react';
import "../styles/cadastro.css";

const submissao = (e, email, senha, segunda_senha = null) => {
  e.preventDefault();
  console.log("E-mail:", email);
  console.log("Senha:", senha);
  if (segunda_senha !== null) {
    console.log("Confirmação de Senha:", segunda_senha);
  }
}
const CaixaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <div className="login-box">
      <h3><i className="fas fa-sign-in-alt"></i> JÁ SOU CADASTRADO</h3>
      <form onSubmit={(e) => submissao(e, email, senha)}>
        <label htmlFor="email">E-mail:</label>
        <input 
          type="email"
          id="email" 
          placeholder="Digite seu e-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="senha">Senha:</label>
        <input 
          type="password" 
          id="senha" 
          placeholder="Digite sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <button type="submit" className="btn">Prosseguir</button>
        
      </form>
    </div>
  )
}
const CaixaCadastro = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [segunda_senha, setSenha2] = useState('');

  return (<div className="cadastro-box">
    <h3><i className="fas fa-user-plus"></i> AINDA NÃO POSSUO CADASTRO</h3>
    <form onSubmit={submissao}>
      <label htmlFor="novo-email">Digite o e-mail que deseja cadastrar:</label>
      <input 
        type="email" 
        id="novo-email" 
        placeholder="Digite seu e-mail" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <label htmlFor="senha">Digite sua senha:</label>
      <input 
        type="password" 
        id="nova-senha" 
        placeholder="Digite sua senha" 
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <label htmlFor="senha_rep">Digite novamente sua senha:</label>
      <input 
        type="password" 
        id="nova-senha_rep" 
        placeholder="Digite sua senha"
        value={segunda_senha}
        onChange={(e) => setSenha2(e.target.value)}
      />

      <button type="submit" className="btn cadastro-btn">Cadastrar</button>
    </form>
  </div>
  )
}
function Cadastro() {

  return (
    <div>
      <div className="container">
        <h2>IDENTIFICAÇÃO</h2>
        <p>Faça seu login ou crie uma conta caso ainda não possua cadastro</p>

        <div className="identificacao">
          <CaixaLogin />
          <CaixaCadastro/>
        </div>
      </div>
    </div>
  );
}

export default Cadastro;
