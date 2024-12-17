import React, { useState } from "react";
import "../styles/cadastro_prestadores.css";

const CadastroPrestadores = () => {
  const [prestador, setPrestador] = useState({
    tipoServico: "",
    preco: "",
    modalidadePreco: "por hora", // Valor padrão
    descricao: "",
    foto: null, // Novo campo para a foto
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrestador({ ...prestador, [name]: value });
  };

  const handleFileChange = (e) => {
    setPrestador({ ...prestador, foto: e.target.files[0] }); // Salva o arquivo selecionado
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in prestador) {
      formData.append(key, prestador[key]);
    }

    // Simulação do envio dos dados
    console.log("Dados do Prestador:", prestador);
    console.log("Foto:", prestador.foto);
    
    // Aqui você faria o envio via API:
    // fetch('/api/prestadores', { method: 'POST', body: formData });
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

        <label>Foto do Prestador:</label>
        <input
          type="file"
          name="foto"
          accept="image/*" // Restringe a seleção a arquivos de imagem
          onChange={handleFileChange}
          required
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroPrestadores;
