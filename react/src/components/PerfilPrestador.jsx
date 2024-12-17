import React from "react";
import "../styles/perfil_prestador.css";

const PerfilPrestador = ({ prestador = {} }) => {
  const { foto, tipoServico, modalidadePreco, preco, descricao } = prestador;

  return (
    <div className="perfil-prestador">
      <h2>Perfil do Prestador</h2>
      <div className="perfil-info">
        {foto ? (
          <img
            src={foto}
            alt={`Foto de ${tipoServico}`}
            className="perfil-foto"
          />
        ) : (
          <div className="perfil-sem-foto">Sem foto disponível</div>
        )}
        <div className="perfil-detalhes">
          <p><strong>Tipo de Serviço:</strong> {tipoServico || "Não informado"}</p>
          <p><strong>Modalidade de Preço:</strong> {modalidadePreco || "Não informado"}</p>
          <p><strong>Preço:</strong> R$ {preco || "Não informado"}</p>
          <p><strong>Descrição:</strong> {descricao || "Sem descrição"}</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilPrestador;
