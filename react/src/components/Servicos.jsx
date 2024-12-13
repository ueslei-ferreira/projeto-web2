import React from "react";
import "../styles/cards_servicos.css";

const ServiceCards = () => {
  // Dados simulados para demonstração
  const services = [
    {
      id: 1,
      nome: "Reparo Elétrico",
      descricao: "Serviço completo de instalação e reparos elétricos.",
      preco: "120,00",
      img: "https://via.placeholder.com/150", // Imagem de demonstração
    },
    {
      id: 2,
      nome: "Manutenção Hidráulica",
      descricao: "Soluções rápidas para encanamentos e vazamentos.",
      preco: "90,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      nome: "Montagem de Móveis",
      descricao: "Montagem profissional e precisa de móveis.",
      preco: "150,00",
      img: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="service-cards">
      {services.map((service) => (
        <div className="card" key={service.id}>
          <img src={service.img} alt={service.nome} className="card-img" />
          <div className="card-content">
            <h3>{service.nome}</h3>
            <p>{service.descricao}</p>
            <p className="card-price">R$ {service.preco}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceCards;
