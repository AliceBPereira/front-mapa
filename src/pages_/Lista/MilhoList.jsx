import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";
import "./lista.css"
import { DataGrid } from '@mui/x-data-grid';

import { Link } from "react-router-dom";
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

function MilhoList() {
  const [milhos, setMilhos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestMilhos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/milhos", {
        params: {
          nome: query.get("nome"),
        },
      });
      setMilhos(response.data.milhos);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestMilhos();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Filter function
  const filterMilhosByStatus = (milhos, status) => {
    if (status === "COLHIDOS") {
      return milhos.filter((milho) => milho.status === "COLHIDO");
    } else if (status === "PLANTADOS") {
      return milhos.filter((milho) => milho.status === "PLANTADO");
    } else {
      return milhos; // Return all cafes if no status is selected
    }
  };
  const filterMilhosBySearch = (milhos, searchTerm) => {
    return milhos.filter((milho) =>
      milho.talhao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  // Update cafes based on filtro
  const filteredMilhos = filterMilhosByStatus(milhos, filtro);
  const searchedMilhos = filterMilhosBySearch(filteredMilhos, search);
  return (
    <div className="lista">
      <h1>Milho</h1>
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
        rows={searchedMilhos}
        columns={[
          {
            field: 'details',
            headerName: 'Detalhes',
            width: 100,
            renderCell: (params) => (
              <Link to={`/MilhoPage/${params.row.id}`} style={{ textDecoration: 'none' }}>
                <button
                  style={{
                    background: 'none',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                  }}
                >
                  Detalhes
                </button>
              </Link>
            ),
          },
          ...columns,
        ]}
        pageSize={5}
        checkboxSelection
        disableRowSelectionOnClick
      />
      
    </div>
  );
}

export default MilhoList;
