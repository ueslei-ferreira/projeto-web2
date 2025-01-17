import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/contratar.css";

const API_URL = "http://127.0.0.1:8000";

const TrabalhoDetalhes = () => {
  const { id } = useParams();
  const [trabalho, setTrabalho] = useState(null);
  const [agendamento, setAgendamento] = useState({ data: "", horario: "" });
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState("");

  useEffect(() => {
    const fetchTrabalhoDetalhes = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/servicos/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTrabalho(response.data);
      } catch (error) {
        setErro("Erro ao carregar os detalhes do trabalho.");
      }
    };

    fetchTrabalhoDetalhes();
  }, [id]);

  const handleAgendar = async (e) => {
    e.preventDefault();
  
    if (!agendamento.data || !agendamento.horario) {
      setErro("Por favor, preencha todos os campos para agendar.");
      return;
    }
  
    try {
      await axios.post(
        `${API_URL}/api/servicos/${id}/agendar/`,
        {
          data: agendamento.data,
          horario: agendamento.horario,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setMensagem("Agendamento realizado com sucesso!");
      setErro("");
      setAgendamento({ data: "", horario: "" });
    } catch (error) {
      console.error(error.response?.data || error.message);
      setErro("Erro ao realizar o agendamento. Verifique os dados e tente novamente.");
    }
  };
  

  return (
    <div className="trabalho-detalhes">
      {erro && <p className="mensagem-erro">{erro}</p>}
      {mensagem && <p className="mensagem-sucesso">{mensagem}</p>}

      {trabalho ? (
        <>
          <h1>{trabalho.tipo_servico}</h1>
          <p>
            <strong>Descrição:</strong> {trabalho.descricao}
          </p>
          <p>
            <strong>Preço:</strong> R$ {trabalho.preco}
          </p>
          <form onSubmit={handleAgendar} className="form-agendamento">
            <h2>Agendar Trabalho</h2>
            <div>
              <label>Data:</label>
              <input
                type="date"
                value={agendamento.data}
                onChange={(e) => setAgendamento({ ...agendamento, data: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Horário:</label>
              <input
                type="time"
                value={agendamento.horario}
                onChange={(e) => setAgendamento({ ...agendamento, horario: e.target.value })}
                required
              />
            </div>
            <button type="submit">Agendar</button>
          </form>
        </>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default TrabalhoDetalhes;
