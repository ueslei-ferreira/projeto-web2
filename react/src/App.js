import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cadastro from "./components/Cadastro";
import ServiceCards from "./components/Servicos";
import Features from "./components/Features";
import CadastroPrestadores from "./components/CadastroPrestadores";
import Navigation from "./components/Navigation";
import Banner from "./components/Banner";
import PerfilPrestador from "./components/PerfilPrestador";
import "./styles/style.css";
import ListaTrabalhos from "./components/ListaTrabalhos";
import TrabalhoDetalhes from "./components/TrabalhoDetalhes";
import MyAppointments from "./components/MeusServicos";
import AvaliarServico from "./components/AvaiarServico";

function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <Navigation />
        <main className="content">
          <Routes>
            <Route path="/" element={<Banner />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/servicos" element={<ServiceCards />} />
            <Route path="/perfil" element={<PerfilPrestador />} />
            <Route path="/cadastro/prestadores" element={<CadastroPrestadores />} />
            <Route path="/trabalhos" element={<ListaTrabalhos />} />
            <Route path="/trabalhos/:id" element={<TrabalhoDetalhes />} />
            <Route path="/meus/trabalhos" element={<MyAppointments />} />
            <Route path="/avaliar" element={<AvaliarServico />} />
          </Routes>
        </main>
        <div className="features-container">
          <Features />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
