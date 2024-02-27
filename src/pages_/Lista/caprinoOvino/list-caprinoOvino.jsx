import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../../lib/axios";

import { DataGrid } from '@mui/x-data-grid';

import { Link } from "react-router-dom";

import styles from '../style/list.module.scss'  // Alterei o nome do arquivo de estilo

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

function ListCaprinoOvino() {  // Alterei o nome da função para ListCaprinoOvino
  const [caprinoOvinos, setCaprinoOvinos] = useState([]);  // Alterei o nome do estado para caprinosOvinos
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestCaprinoOvinos = async () => {  // Alterei o nome da função para request
    setLoading(true);
    try {
      const response = await api.get("/caprinoOvinos", {  // Alterei a rota para "/caprinosOvinos"
        params: {
          nome: query.get("nome"),
        },
      });
      setCaprinoOvinos(response.data.caprinoOvinos);  // Alterei o nome do estado para caprinosOvinos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCaprinoOvinos();  // Alterei a chamada da função para request
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função de filtro
  const filterCaprinoOvinosByStatus = (caprinoOvinos, status) => {  // Alterei o nome da função para filterCaprinosOvinosByStatus
    if (status === "COLHIDOS") {
      return caprinoOvinos.filter((caprinoOvino) => caprinoOvino.status === "COLHIDO");
    } else if (status === "PLANTADOS") {
      return caprinoOvinos.filter((caprinoOvino) => caprinoOvino.status === "PLANTADO");
    } else {
      return caprinoOvinos; // Retorna todos os  se nenhum status for selecionado
    }
  };

  const filterCaprinoOvinosBySearch = (caprinoOvinos, searchTerm) => {  // Alterei o nome da função para filterCaprinosOvinosBySearch
    return caprinoOvinos.filter((caprinoOvino) =>
      caprinoOvino.talhao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Atualiza  com base no filtro
  const filteredCaprinoOvinos = filterCaprinoOvinosByStatus(caprinoOvinos, filtro);
  
  const searchedCaprinoOvinos = filterCaprinoOvinosBySearch(filteredCaprinoOvinos, search);

  return (
    <div className={styles.container}>
      <h1>CaprinoOvino</h1> 
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
          rows={searchedCaprinoOvinos}
          columns={[
            {
              field: 'details',
              headerName: 'Detalhes',
              width: 100,
              renderCell: (params) => (
                <Link to={`/CaprinoOvinoPage/${params.row.id}`} style={{ textDecoration: 'none' }}>  {/* Alterei a rota para "/CaprinoOvinoPage" */}
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

export default ListCaprinoOvino;  // Alterei o nome da exportação para ListCaprinoOvino
