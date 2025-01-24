import React, { useState } from "react";
import { useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import "../styles/avaliar.css";

const AvaliarServico = ({ voltar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { servicoId } = location.state;
  const [avaliacao, setAvaliacao] = useState({
    pontualidade: 0,
    qualidade: 0,
    comunicacao: 0,
    custo_beneficio: 0,
    profissionalismo: 0,
    servico: servicoId, // Inclui o ID do serviço diretamente
  });
  const [mensagem, setMensagem] = useState(""); // Estado para a mensagem

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAvaliacao((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
  };

  const submitAvaliacao = async () => {
    try {
      await axios.post("http://127.0.0.1:8000/api/avaliacoes/", avaliacao, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMensagem("Avaliação enviada com sucesso!"); // Mensagem de sucesso
      setTimeout(() => {
        navigate("/")
      }, 2000);
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
      setMensagem("Erro ao enviar avaliação."); // Mensagem de erro
    }
  };

  return (
    <div className="avaliar-servico-container">
      <h3>Avaliar Serviço</h3>
      {mensagem && (
        <p className={mensagem.includes("sucesso") ? "mensagem-sucesso" : "mensagem-erro"}>
          {mensagem}
        </p>
      )}
      {Object.keys(avaliacao).map((key) =>
        key !== "servico" ? (
          <div key={key}>
            <label>{key.replace(/_/g, " ").toUpperCase()}</label>
            <input
              type="number"
              name={key}
              min="0"
              max="5"
              value={avaliacao[key]}
              onChange={handleChange}
            />
          </div>
        ) : null
      )}
      <button onClick={submitAvaliacao}>Enviar Avaliação</button>
    </div>
  );
};

export default AvaliarServico;
