import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";
import Modal from "react-modal";
import { Bar } from "react-chartjs-2";
import { Link } from "react-router-dom";

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
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

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
    // Filtrar os cafés com base na opção selecionada em 'filtro'
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
      <Modal key={selectedCafe.id} isOpen={modalIsOpen} onRequestClose={closeModal} style={modalStyle}>
        {selectedCafe && (
          <div>
            <div>
                  <Link  to={`/CafePage/${selectedCafe.id}`} style={{ textDecoration: "none" }}>
                    <button
                      style={{
                        background: "none",
                        border: "none",
                        padding: 0,
                        cursor: "pointer",
                      }}
                    >
                      Detalhes 
                    </button>
                  </Link>
                </div>
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
