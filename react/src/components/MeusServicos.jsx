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

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]); // Estado inicial garantido como array vazio
  const [services, setServices] = useState({}); // Estado para armazenar os detalhes dos serviços
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      console.log("Iniciando fetchAppointments...");
      try {
        const response = await axios.get(`${API_URL}/api/agendamentos/meus`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        console.log("Resposta inicial da API:", response.data);

        if (Array.isArray(response.data)) {
          setAppointments(response.data);
          const serviceIds = response.data.map(appointment => appointment.servico);
          await fetchServices(serviceIds);
        } else {
          console.error("Formato inesperado da resposta da API:", response.data);
          setError("Erro ao carregar agendamentos.");
        }
      } catch (err) {
        console.error("Erro ao buscar agendamentos:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          console.log("Token expirado, tentando renovar...");
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            try {
              const retryResponse = await axios.get(`${API_URL}/api/agendamentos/meus`, {
                headers: {
                  Authorization: `Bearer ${newAccessToken}`,
                },
              });

              if (Array.isArray(retryResponse.data)) {
                setAppointments(retryResponse.data);
                const serviceIds = retryResponse.data.map(appointment => appointment.servico);
                await fetchServices(serviceIds);
              } else {
                console.error("Formato inesperado da resposta da API:", retryResponse.data);
                setError("Erro ao carregar agendamentos.");
              }
            } catch (retryError) {
              console.error("Erro ao buscar agendamentos após renovar o token:", retryError);
              setError("Erro ao carregar agendamentos.");
            }
          } else {
            setError("Sessão expirada. Faça login novamente.");
          }
        } else {
          setError("Erro ao carregar agendamentos.");
        }
      }
    };

    const fetchServices = async (serviceIds) => {
      try {
        const servicePromises = serviceIds.map(id =>
          axios.get(`${API_URL}/api/servicos/${id}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          })
        );

        const serviceResponses = await Promise.all(servicePromises);
        const servicesData = {};
        serviceResponses.forEach(response => {
          servicesData[response.data.id] = response.data;
        });
        setServices(servicesData);
      } catch (err) {
        console.error("Erro ao buscar serviços:", err.response?.data || err.message);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="service-cards">
      {error && <p className="error-message">{error}</p>}
      {appointments.length > 0 ? (
        appointments.map((appointment) => {
          const service = services[appointment.servico];
          return (
            <Link key={appointment.id} to={`/agendamentos/${appointment.id}`}>
              <div className="card">
                <div className="card-content">
                  {service ? (
                    <>
                      <h3>{service.tipo_servico}</h3>
                      <p className="card-price">R$ {service.preco}</p>
                      <p className="card-modalidade">Modalidade: {service.modalidade_preco}</p>
                    </>
                  ) : (
                    <p>Carregando detalhes do serviço...</p>
                  )}
                  <p className="card-date">Data: {appointment.data}</p>
                  <p className="card-time">Horário: {appointment.horario}</p>
                </div>
              </div>
            </Link>
          );
        })
      ) : (
        <p>Nenhum agendamento encontrado.</p>
      )}
    </div>
  );
};

export default MyAppointments;
