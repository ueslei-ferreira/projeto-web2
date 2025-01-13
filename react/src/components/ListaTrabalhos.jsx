import React from "react";
import "../styles/lista_trabalhos.css";
import { Link } from "react-router-dom";

const ListaTrabalhos = () => {
  const trabalhos = [
    {
      id: 1,
      titulo: "Limpeza semanal em apartamento",
      tipoServico: "Limpeza Residencial",
      precoOferecido: 200,
      modalidadePreco: "Por Hora",
      descricao: "Procuro alguém para limpar meu apartamento de 80m² uma vez por semana.",
    },
    {
      id: 2,
      titulo: "Reparos elétricos em residência",
      tipoServico: "Manutenção Elétrica",
      precoOferecido: 500,
      modalidadePreco: "Serviço Completo",
      descricao: "Preciso consertar tomadas e substituir disjuntores antigos.",
    },
    {
      id: 3,
      titulo: "Jardinagem mensal",
      tipoServico: "Jardinagem",
      precoOferecido: 300,
      modalidadePreco: "Serviço Completo",
      descricao: "Manutenção de jardim pequeno, incluindo poda e adubação.",
    },
  ];

  return (
    <div className="lista-trabalhos">
      <h2>Trabalhos Disponíveis</h2>
      {trabalhos.map((trabalho) => (
        <Link to="/detalhes-trabalho">
          <div key={trabalho.id} className="trabalho-card">
            <h3>{trabalho.titulo}</h3>
            <p>
              <strong>Serviço:</strong> {trabalho.tipoServico}
            </p>
            <p>
              <strong>Preço Oferecido:</strong> R$ {trabalho.precoOferecido}
            </p>
            <p>
              <strong>Modalidade:</strong> {trabalho.modalidadePreco}
            </p>
            <p>
              <strong>Descrição:</strong> {trabalho.descricao}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListaTrabalhos;
