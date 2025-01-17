import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "../styles/cadastro.css";

const API_URL = "http://127.0.0.1:8000";

const cadastro = async (e, email, senha, segunda_senha, setCadastroFeito) => {
  e.preventDefault();
  if (segunda_senha === senha) {
    try {
      const response = await axios.post(`${API_URL}/api/register/`, {
        email,
        password: senha,
      });
      console.log("Usuário cadastrado com sucesso:", response.data);
      setCadastroFeito(true);
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error.response?.data || error.message);
    }
  } else {
    console.error("As senhas não coincidem!");
  }
};


const login = async (e, email, senha) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_URL}/api/login/`, {
      email: email,
      senha: senha, // Certifique-se de que o campo está correto
    });

    if (response?.data?.access) {
      const token = response.data.access;
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      console.log("Login bem-sucedido!", response.data);
    } else {
      console.error("Token não encontrado na resposta:", response.data);
    }
  } catch (error) {
    console.error("Erro ao fazer login:", error.response?.data || error.message);
  }
};



const CaixaLogin = () => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !senha) {
      console.error("E-mail e senha são obrigatórios");
      return;
    }
    setIsLoading(true);
    login(e, email, senha)
      .then(() => {
        // Redireciona para a página principal após login bem-sucedido
        navigate("/");
      })
      .catch((err) => {
        console.error("Erro ao fazer login:", err);
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="login-box">
      <h3><i className="fas fa-sign-in-alt"></i> JÁ SOU CADASTRADO</h3>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="btn" disabled={isLoading}>Prosseguir</button>
      </form>
    </div>
  );
};

const CaixaCadastro = ({ setCadastroFeito }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [segunda_senha, setSenha2] = useState('');

  return (
    <div className="cadastro-box">
      <h3><i className="fas fa-user-plus"></i> AINDA NÃO POSSUO CADASTRO</h3>
      <form onSubmit={(e) => cadastro(e, email, senha, segunda_senha, setCadastroFeito)}>
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
  const [cadastroFeito, setCadastroFeito] = useState(false);

  return (
    <div>
      <div className="container">
        <h2>IDENTIFICAÇÃO</h2>
        <p>Faça seu login ou crie uma conta caso ainda não possua cadastro</p>

        <div className="identificacao">
          {!cadastroFeito && <CaixaCadastro setCadastroFeito={setCadastroFeito} />}
          <CaixaLogin />
        </div>
      </div>
    </div>
  );
}

export default Cadastro;