import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";
import Modal from "react-modal";
import { Bar } from 'react-chartjs-2';

const modalStyle = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Search() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCafe, setSelectedCafe] = useState(null);
  const [filtro, setFiltro] = useState("PLANTADOS");

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestCafes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/cafes", {
        params: {
          nome: query.get("nome"),
        },
      });
      setCafes(response.data.cafes);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCafes();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const filterCafes = () => {
    let filteredCafes = cafes;
    if (search) {
      filteredCafes = filteredCafes.filter((cafe) =>
        cafe.talhao.toLowerCase().includes(search.toLowerCase())
      );
    }
    
    if (filtro === "PLANTADOS") {
      filteredCafes = filteredCafes.filter((cafe) => cafe.status === "PLANTADO");
    } else if (filtro === "COLHIDOS") {
      filteredCafes = filteredCafes.filter((cafe) => cafe.status === "COLHIDO");
    }
    
    return filteredCafes;
  };

  const openModal = (cafe) => {
    setSelectedCafe(cafe);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  // Adicionando a parte do gráfico
  const cafesColhidos = cafes.filter(cafe => cafe.status === 'COLHIDO');
  const talhoes = [...new Set(cafesColhidos.map(cafe => cafe.talhao))]; // obter todos os talhões únicos

  const data = {
    labels: talhoes,
    datasets: [
      {
        label: 'Número de Cafés Colhidos por Talhão',
        data: talhoes.map(talhao => cafesColhidos.filter(cafe => cafe.talhao === talhao).length),
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      }
    ]
  };

  return (
    <div>
      <h1>Esta é a página de pesquisa</h1>
      <input
        type="search"
        placeholder="Pesquisar por talhão"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        <label>
          Filtrar por status:
          <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
            <option value="PLANTADOS">PLANTADOS</option>
            <option value="COLHIDOS">COLHIDOS</option>
          </select>
        </label>
      </div>
      <ul>
        {filterCafes().map((cafe) => (
          <li key={cafe.id}>
            <span onClick={() => openModal(cafe)} style={{ cursor: "pointer" }}>
              {cafe.talhao}
            </span>
          </li>
        ))}
      </ul>
      
      {/* Adicionando o gráfico aqui */}
      {filtro === 'COLHIDOS' && <Bar data={data} />}
      
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle}>
        {selectedCafe && (
          <div>
            <strong>Talhão:</strong>
            <span>{selectedCafe.talhao}</span>
            <strong>Área em Hectares: </strong>
            <span>{selectedCafe.area_ha}</span>
            <strong>Espaçamento: </strong>
            <span>{selectedCafe.espacament}</span>
            <strong>Estande: </strong>
            <span>{selectedCafe.estande}</span>
            <strong>Numero de Plantas: </strong>
            <span>{selectedCafe.n_de_plantas}</span>
            <strong>Ano de Plantio: </strong>
            <span>{selectedCafe.ano_plantio}</span>
            <button onClick={closeModal}>Fechar</button>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Search;