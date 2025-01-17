import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/cards_servicos.css";

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
    return newAccessToken;
  } catch (error) {
    console.error("Erro ao renovar o token de acesso:", error.response?.data || error.message);
    return null;
  }
};

const ServiceCards = () => {
  const [services, setServices] = useState([]); // Estado inicial garantido como array vazio
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      console.log("Iniciando fetchServices...");
      try {
        const response = await axios.get(`${API_URL}/api/servicos/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Resposta inicial da API:", response.data);

        if (Array.isArray(response.data)) {
          setServices(response.data);
        } else if (Array.isArray(response.data.results)) {
          setServices(response.data.results);
        } else {
          console.error("Formato inesperado da resposta da API:", response.data);
          setError("Erro ao carregar serviços.");
        }
      } catch (err) {
        console.error("Erro ao buscar serviços:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              const retryResponse = await axios.get(`${API_URL}/api/servicos/`, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              if (Array.isArray(retryResponse.data)) {
                setServices(retryResponse.data);
              } else if (Array.isArray(retryResponse.data.results)) {
                setServices(retryResponse.data.results);
              } else {
                console.error("Formato inesperado da resposta da API:", retryResponse.data);
                setError("Erro ao carregar serviços.");
              }
            } catch (retryError) {
              console.error("Erro ao buscar serviços após renovar o token:", retryError);
              setError("Erro ao carregar serviços.");
            }
          } else {
            setError("Sessão expirada. Faça login novamente.");
          }
        } else {
          setError("Erro ao carregar serviços.");
        }
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="service-cards">
      {error && <p className="error-message">{error}</p>}
      {services.length > 0 ? (
        services.map((service) => (
          <Link key={service.id} to={`/trabalhos/${service.id}`}>
            <div className="card">
              <div className="card-content">
                <h3>{service.tipo_servico}</h3>
                <p className="card-price">R$ {service.preco}</p>
                <p className="card-modalidade">Modalidade: {service.modalidade_preco}</p>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <p>Nenhum serviço encontrado.</p>
      )}
    </div>
  );
};

export default ServiceCards;
