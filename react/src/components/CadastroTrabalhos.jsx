import React, { useState } from "react";
import "../styles/cadastro_trabalhos.css";

const CadastroTrabalhos = () => {
  const [trabalho, setTrabalho] = useState({
    titulo: "",
    tipoServico: "",
    precoOferecido: "",
    modalidadePreco: "por hora", // Valor padrão
    descricao: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrabalho({ ...trabalho, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Simulação do envio dos dados
    console.log("Dados do Trabalho:", trabalho);

    // Aqui você faria o envio via API:
    // fetch('/api/trabalhos', { method: 'POST', body: JSON.stringify(trabalho), headers: { 'Content-Type': 'application/json' } });
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
    <div className="cadastro-trabalhos">
      <h2>Cadastro de Trabalhos Disponíveis</h2>
      <form onSubmit={handleSubmit}>
        <label>Título do Trabalho:</label>
        <input
          name="titulo"
          type="text"
          value={trabalho.titulo}
          onChange={handleChange}
          placeholder="Exemplo: Limpeza semanal em apartamento"
          required
        />

        <label>Tipo de Serviço:</label>
        <select
          name="tipoServico"
          value={trabalho.tipoServico}
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
          value={trabalho.modalidadePreco}
          onChange={handleChange}
        >
          <option value="por hora">Por Hora</option>
          <option value="serviço completo">Serviço Completo</option>
        </select>

        <label>Preço Oferecido (R$):</label>
        <input
          name="precoOferecido"
          type="number"
          value={trabalho.precoOferecido}
          onChange={handleChange}
          placeholder="Exemplo: 150"
          required
        />

        <label>Descrição:</label>
        <textarea
          name="descricao"
          value={trabalho.descricao}
          onChange={handleChange}
          rows="4"
          placeholder="Descreva os detalhes do trabalho, incluindo requisitos, local e outras informações relevantes"
          required
        />

        <button type="submit">Cadastrar Trabalho</button>
      </form>
    </div>
  );
};

export default CadastroTrabalhos;
