import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/lista_trabalhos.css";

const API_URL = "http://127.0.0.1:8000"; // Base da API

const ListaTrabalhos = () => {
  const [trabalhos, setTrabalhos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTrabalhos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/trabalhos/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setTrabalhos(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar trabalhos:", err.response?.data || err.message);
        setError("Erro ao carregar trabalhos. Tente novamente mais tarde.");
        setLoading(false);
      }
    };

    fetchTrabalhos();
  }, []);

  if (loading) {
    return <p>Carregando trabalhos...</p>;
  }

  if (error) {
    return <p className="erro">{error}</p>;
  }

  return (
    <div className="lista-trabalhos">
      <h2>Trabalhos Disponíveis</h2>
      {trabalhos.length === 0 ? (
        <p>Nenhum trabalho encontrado.</p>
      ) : (
        trabalhos.map((trabalho) => (
          <Link key={trabalho.id} to={`/detalhes-trabalho/${trabalho.id}`}>
            <div className="trabalho-card">
              <h3>{trabalho.titulo}</h3>
              <p>
                <strong>Serviço:</strong> {trabalho.tipo_servico}
              </p>
              <p>
                <strong>Preço Oferecido:</strong> R$ {trabalho.preco_oferecido}
              </p>
              <p>
                <strong>Modalidade:</strong> {trabalho.modalidade_preco}
              </p>
              <p>
                <strong>Descrição:</strong> {trabalho.descricao}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default ListaTrabalhos;
