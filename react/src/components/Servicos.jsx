import React from "react";
import { Link } from "react-router-dom";
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
    {
      id: 4,
      nome: "Limpeza Residencial",
      descricao: "Limpeza completa para sua casa, com atenção aos detalhes.",
      preco: "70,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      nome: "Jardinagem",
      descricao: "Manutenção de jardins, poda e paisagismo.",
      preco: "110,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 6,
      nome: "Pintura de Paredes",
      descricao: "Pintura residencial e comercial com acabamento impecável.",
      preco: "200,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 7,
      nome: "Reformas Gerais",
      descricao: "Serviços de reforma completos para sua residência.",
      preco: "350,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 8,
      nome: "Assistência Técnica",
      descricao: "Reparos e manutenção de eletrodomésticos.",
      preco: "80,00",
      img: "https://via.placeholder.com/150",
    },
    {
      id: 9,
      nome: "Aulas Particulares",
      descricao: "Aulas personalizadas para diversas disciplinas.",
      preco: "50,00",
      img: "https://via.placeholder.com/150",
    },
  ];
  

  return (
    <div className="service-cards">
      {services.map((service) => (
        <Link to = "/perfil">
          <div className="card" key={service.id}>
            <img src={service.img} alt={service.nome} className="card-img" />
            <div className="card-content">
              <h3>{service.nome}</h3>
              <p>{service.descricao}</p>
              <p className="card-price">R$ {service.preco}</p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ServiceCards;
