import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Importa useNavigate para redirecionar
import "../styles/perfil_prestador.css";

const PerfilPrestador = () => {
  const [perfil, setPerfil] = useState(null);
  const [erro, setErro] = useState("");
  const navigate = useNavigate(); // Inicializa o hook de navegação

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const token = localStorage.getItem("token");
  
        // Se não houver token, redireciona para a página de login
        if (!token) {
          navigate("/cadastro", { replace: true });
          return;
        }
  
        const headers = { Authorization: `Bearer ${token}` };
  
        // Buscar detalhes do usuário logado
        const userResponse = await axios.get("http://127.0.0.1:8000/api/user/", { headers });
        const userId = userResponse.data.id;
  
        // Buscar avaliações recebidas
        const avaliacoesResponse = await axios.get(`http://127.0.0.1:8000/api/avaliacoes/?prestador=${userId}`, { headers });
        const avaliacoes = avaliacoesResponse.data;
  
        // Calcular médias
        const totalAvaliacoes = avaliacoes.length;
        const mediaAvaliacao = (criterio) =>
          totalAvaliacoes
            ? avaliacoes.reduce((acc, av) => acc + av[criterio], 0) / totalAvaliacoes
            : 0;
  
        setPerfil({
          email: userResponse.data.email,
          servicosConcluidos: totalAvaliacoes, // Total de avaliações é igual ao número de serviços concluídos
          mediaEstrelas: mediaAvaliacao("media").toFixed(2),
          pontualidade: mediaAvaliacao("pontualidade").toFixed(2),
          qualidade: mediaAvaliacao("qualidade").toFixed(2),
          comunicacao: mediaAvaliacao("comunicacao").toFixed(2),
          custoBeneficio: mediaAvaliacao("custo_beneficio").toFixed(2),
          profissionalismo: mediaAvaliacao("profissionalismo").toFixed(2),
        });
      } catch (error) {
        // Verifica se o erro é de autenticação (erro 401)
        if (error.response && error.response.status === 401) {
          navigate("/cadastro", { replace: true });
        } else {
          console.error("Erro ao buscar perfil:", error);
          setErro("Erro ao carregar os dados do perfil.");
        }
      }
    };
  
    fetchPerfil();
  }, [navigate]); // Adiciona 'navigate' como dependência

  if (erro) {
    return <p className="erro">{erro}</p>;
  }

  if (!perfil) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="perfil-prestador-container">
      <h3>Perfil do Prestador</h3>
      <div className="perfil-prestador-content">
        <div className="perfil-prestador-esquerda">
          <p><strong>Email:</strong> {perfil.email}</p>
          <p><strong>Serviços Concluídos:</strong> {perfil.servicosConcluidos}</p>
          <div className="perfil-media-estrelas">
            <p><strong>Média de Estrelas:</strong></p>
            <div className="estrelas">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="estrela">
                  <div
                    className="estrela-preenchida"
                    style={{
                      width: `${Math.min(1, Math.max(0, perfil.mediaEstrelas - i)) * 100}%`
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="perfil-prestador-direita">
          <p><strong>Pontualidade:</strong> {perfil.pontualidade}</p>
          <p><strong>Qualidade:</strong> {perfil.qualidade}</p>
          <p><strong>Comunicação:</strong> {perfil.comunicacao}</p>
          <p><strong>Custo-Benefício:</strong> {perfil.custoBeneficio}</p>
          <p><strong>Profissionalismo:</strong> {perfil.profissionalismo}</p>
        </div>
      </div>
    </div>
  );
};

export default PerfilPrestador;
