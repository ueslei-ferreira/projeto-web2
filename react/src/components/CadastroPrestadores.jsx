import React, { useState } from "react";
import "../styles/cadastro_prestadores.css";

const CadastroPrestadores = () => {
  const [prestador, setPrestador] = useState({
    
    tipoServico: "",
    preco: "",
    modalidadePreco: "por hora", // Valor padrão
    descricao: "",
  });

  const handleChange = (e) => {
    setPrestador({ ...prestador, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Dados do Prestador:", prestador);
  };

  return (
    <div className="cadastro-prestadores">
      <h2>Cadastro de Prestadores</h2>
      <form onSubmit={handleSubmit}>
        
        <label>Tipo de Serviço:</label>
        <input
          name="tipoServico"
          value={prestador.tipoServico}
          onChange={handleChange}
          required
        />
        
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
        
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPrestadores;
