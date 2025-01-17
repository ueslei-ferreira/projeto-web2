import React, { useState } from "react";
import axios from "axios";
import "../styles/cadastro_prestadores.css";

const API_URL = "http://127.0.0.1:8000"; // Base da API

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) {
    console.error("Refresh token não encontrado.");
    return null;
  }

  try {
    const response = await axios.post(`${API_URL}/api/token/refresh/`, {
      refresh: refreshToken,
    });

    const newAccessToken = response.data.access;
    localStorage.setItem("token", newAccessToken);
    console.log("Token de acesso renovado com sucesso!", newAccessToken);
    return newAccessToken; // Retorna o token atualizado
  } catch (error) {
    console.error("Erro ao renovar o token de acesso:", error.response?.data || error.message);
    return null; // Retorna null em caso de erro
  }
};

const CadastroPrestadores = () => {
  const [prestador, setPrestador] = useState({
    tipoServico: "",
    preco: "",
    modalidadePreco: "por hora", // Valor padrão
    descricao: "",
    foto: null, // Novo campo para a foto
  });

  const [mensagem, setMensagem] = useState(""); // Para feedback ao usuário

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestador({ ...prestador, [name]: value });
  };

  const handleFileChange = (e) => {
    setPrestador({ ...prestador, foto: e.target.files[0] }); // Salva o arquivo selecionado
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("tipo_servico", prestador.tipoServico);
    formData.append("modalidade_preco", prestador.modalidadePreco);
    formData.append("preco", prestador.preco);
    formData.append("descricao", prestador.descricao);
    if (prestador.foto) {
      formData.append("foto", prestador.foto);
    }

    console.log("Dados enviados:");
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    try {
      const response = await axios.post(`${API_URL}/api/servicos/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      console.log("Prestador cadastrado com sucesso:", response.data);
      setMensagem("Prestador cadastrado com sucesso!");
      setPrestador({
        tipoServico: "",
        preco: "",
        modalidadePreco: "por hora",
        descricao: "",
        foto: null,
      });
    } catch (error) {
      if (error.response?.status === 401) {
        const newAccessToken = await refreshAccessToken(); // Atualiza o token
        if (newAccessToken) {
          try {
            const retryResponse = await axios.post(`${API_URL}/api/servicos/`, formData, {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${newAccessToken}`,
              },
            });

            console.log("Prestador cadastrado com sucesso:", retryResponse.data);
            setMensagem("Prestador cadastrado com sucesso!");
            setPrestador({
              tipoServico: "",
              preco: "",
              modalidadePreco: "por hora",
              descricao: "",
              foto: null,
            });
          } catch (retryError) {
            console.error(
              "Erro ao cadastrar prestador após atualizar o token:",
              retryError.response?.data || retryError.message
            );
            setMensagem("Erro após atualizar o token.");
          }
        } else {
          setMensagem("Sessão expirada. Faça login novamente.");
        }
      } else {
        console.error("Erro ao cadastrar prestador:", error.response?.data || error.message);
        setMensagem(`Erro: ${error.response?.data?.message || "Falha no cadastro"}`);
      }
    }
  };

  const servicos = [
    "Limpeza Residencial",
    "Manutenção Elétrica",
    "Reformas",
    "Jardinagem",
    "Aulas Particulares",
    "Cuidador de Idosos",
    "Consultoria",
  ];

  return (
    <div className="cadastro-prestadores">
      <h2>Cadastro de Prestadores</h2>
      {mensagem && <p className="mensagem-feedback">{mensagem}</p>}
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label>Tipo de Serviço:</label>
        <select
          name="tipoServico"
          value={prestador.tipoServico}
          onChange={handleChange}
          required
        >
          <option value="">Selecione um serviço</option>
          {servicos.map((servico, index) => (
            <option key={index} value={servico}>
              {servico}
            </option>
          ))}
        </select>

        <label>Modalidade de Preço:</label>
        <select
          name="modalidadePreco"
          value={prestador.modalidadePreco}
          onChange={handleChange}
        >
          <option value="por hora">Por Hora</option>
          <option value="serviço completo">Serviço Completo</option>
        </select>

        <label>Preço (R$):</label>
        <input
          name="preco"
          type="number"
          value={prestador.preco}
          onChange={handleChange}
          required
        />

        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={prestador.descricao}
          onChange={handleChange}
          rows="4"
          placeholder="Descreva seus serviços, experiência e outras informações relevantes"
          required
        />

        <label>Foto do Prestador:</label>
        <input
          type="file"
          name="foto"
          accept="image/*"
          onChange={handleFileChange}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPrestadores;
