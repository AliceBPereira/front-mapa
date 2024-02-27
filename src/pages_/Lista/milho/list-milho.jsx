import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../../lib/axios";

import { DataGrid } from '@mui/x-data-grid';

import { Link } from "react-router-dom";

import styles from '../style/list.module.scss'

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'talhao', headerName: 'Talhão', width: 150 },
  { field: 'area_ha', headerName: 'Área em Hectares', width: 180 },
  { field: 'espacament', headerName: 'Espaçamento', width: 150 },
  { field: 'estande', headerName: 'Estande', width: 130 },
  { field: 'n_de_plantas', headerName: 'Número de Plantas', width: 170 },
  { field: 'ano_plantio', headerName: 'Ano de Plantio', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 }, // Adicione a coluna de status
];

function ListMilho() {  // Alterei o nome da função para ListMilho
  const [milhos, setMilhos] = useState([]);  // Alterei o nome do estado para milhos
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestMilhos = async () => {  // Alterei o nome da função para requestMilhos
    setLoading(true);
    try {
      const response = await api.get("/milhos", {  // Alterei a rota para "/milhos"
        params: {
          nome: query.get("nome"),
        },
      });
      setMilhos(response.data.milhos);  // Alterei o nome do estado para milhos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestMilhos();  // Alterei a chamada da função para requestMilhos
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função de filtro
  const filterMilhosByStatus = (milhos, status) => {  // Alterei o nome da função para filterMilhosByStatus
    if (status === "COLHIDOS") {
      return milhos.filter((milho) => milho.status === "COLHIDO");
    } else if (status === "PLANTADOS") {
      return milhos.filter((milho) => milho.status === "PLANTADO");
    } else {
      return milhos; // Retorna todos os milhos se nenhum status for selecionado
    }
  };

  const filterMilhosBySearch = (milhos, searchTerm) => {  // Alterei o nome da função para filterMilhosBySearch
    return milhos.filter((milho) =>
      milho.talhao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Atualiza milhos com base no filtro
  const filteredMilhos = filterMilhosByStatus(milhos, filtro);
  
  const searchedMilhos = filterMilhosBySearch(filteredMilhos, search);

  return (
    <div className={styles.container}>
      <h1>Milho</h1>  {/* Alterei o título para "Milho" */}
      <div className={styles.form}>
        
          <select
            className={styles.select}
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          >
            <option value="PLANTADOS">PLANTADOS</option>
            <option value="COLHIDOS">COLHIDOS</option>
            <option value="">Todos</option>
          </select>
        
        <input
          className={styles.input}
          type="search"
          placeholder="Pesquisar por talhão"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className={styles.grid}>
        <DataGrid
          rows={searchedMilhos}
          columns={[
            {
              field: 'details',
              headerName: 'Detalhes',
              width: 100,
              renderCell: (params) => (
                <Link to={`/MilhoPage/${params.row.id}`} style={{ textDecoration: 'none' }}>  {/* Alterei a rota para "/MilhoPage" */}
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
    </div>
  );
}

export default ListMilho;  // Alterei o nome da exportação para ListMilho
