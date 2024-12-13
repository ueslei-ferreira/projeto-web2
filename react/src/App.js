import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cadastro from "./components/Cadastro";
import ServiceCards from "./components/Servicos";
import Features from "./components/Features";
import CadastroPrestadores from "./components/CadastroPrestadores";
import Navigation from "./components/Navigation";

import "./styles/style.css";
import Banner from "./components/Banner";

function App() {
  return (
    <Router>
      <div className="page">
        <Header />
        <Navigation />
        <main>
          <Banner/>
          <Routes>
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/servicos" element={<ServiceCards />} />
            <Route path="/cadastro/prestadores" element={<CadastroPrestadores />} />
          </Routes>
          <Features />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
