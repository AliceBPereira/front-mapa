import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";
import Modal from "react-modal";
import { DataGrid } from '@mui/x-data-grid';


const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'talhao', headerName: 'Talhão', width: 150 },
  { field: 'area_ha', headerName: 'Área em Hectares', width: 180 },
  { field: 'espacament', headerName: 'Espaçamento', width: 150 },
  { field: 'estande', headerName: 'Estande', width: 130 },
  { field: 'n_de_plantas', headerName: 'Número de Plantas', width: 170 },
  { field: 'ano_plantio', headerName: 'Ano de Plantio', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 }, // Add status column
];

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

function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
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

  // Filter function
  const filterCafesByStatus = (cafes, status) => {
    if (status === "COLHIDOS") {
      return cafes.filter((cafe) => cafe.status === "COLHIDO");
    } else if (status === "PLANTADOS") {
      return cafes.filter((cafe) => cafe.status === "PLANTADO");
    } else {
      return cafes; // Return all cafes if no status is selected
    }
  };

  // Update cafes based on filtro
  const filteredCafes = filterCafesByStatus(cafes, filtro);

  return (
    <div>
      <h1>Listagem</h1>
      <select
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      >
        <option value="PLANTADOS">PLANTADOS</option>
        <option value="COLHIDOS">COLHIDOS</option>
        <option value="">Todos</option>
      </select>
      <input
        type="search"
        placeholder="Pesquisar por talhão"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      
      <DataGrid
        rows={filteredCafes}
        columns={columns}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
        
      />
      
    </div>
  );
}

export default CafeList;
