import React, { useState } from "react";
import "../styles/detalhes_trabalho.css";

const DetalhesTrabalho = ({ trabalho, voltar }) => {
  const [agendamento, setAgendamento] = useState({ data: "", horario: "" });

  const handleAgendamento = (e) => {
    const { name, value } = e.target;
    setAgendamento((prev) => ({ ...prev, [name]: value }));
  };

  const confirmarAgendamento = () => {
    alert(`Agendamento confirmado para ${agendamento.data} às ${agendamento.horario}`);
  };

  return (
    <div className="detalhes-trabalho">
      <button onClick={voltar} className="botao-voltar">
        Voltar
      </button>
      <h2>{trabalho.titulo}</h2>
      <p><strong>Serviço:</strong> {trabalho.tipoServico}</p>
      <p><strong>Descrição:</strong> {trabalho.descricao}</p>
      <p><strong>Preço:</strong> R$ {trabalho.precoOferecido} ({trabalho.modalidadePreco})</p>
      <p><strong>Localização:</strong> {trabalho.localizacao}</p>
      <div className="agendamento">
        <h3>Agendar Trabalho</h3>
        <label>
          Data:
          <input
            type="date"
            name="data"
            value={agendamento.data}
            onChange={handleAgendamento}
          />
        </label>
        <label>
          Horário:
          <input
            type="time"
            name="horario"
            value={agendamento.horario}
            onChange={handleAgendamento}
          />
        </label>
        <button onClick={confirmarAgendamento} disabled={!agendamento.data || !agendamento.horario}>
          Confirmar
        </button>
      </div>
    </div>
  );
};

export default DetalhesTrabalho;
