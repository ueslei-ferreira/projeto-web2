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
import CadastroTrabalhos from "./components/CadastroTrabalhos";
import ListaTrabalhos from "./components/ListaTrabalhos";
import DetalhesTrabalho from "./components/DetalhesTrabalho";
function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Banner/>} />            
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/servicos" element={<ServiceCards />} />
            <Route path="/perfil" element={<PerfilPrestador/>} />
            <Route path="/cadastro/prestadores" element={<CadastroPrestadores />} />
            <Route path="/cadastro/trabalhos" element={<CadastroTrabalhos/>} /> 
            <Route path="/trabalhos" element={<ListaTrabalhos/>} />
            <Route path="/detalhes-trabalho" element={<DetalhesTrabalho/>} />
          </Routes>
          <Features />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
