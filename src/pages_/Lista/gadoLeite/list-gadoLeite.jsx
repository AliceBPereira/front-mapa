import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { api } from "../../../lib/axios";

import { DataGrid } from '@mui/x-data-grid';

import { Link } from "react-router-dom";

import styles from '../style/list.module.scss'  // Alterei o nome do módulo

const columns = [
  { field: 'id', headerName: 'ID', width: 90 },
  { field: 'talhao', headerName: 'Talhão', width: 150 },
  { field: 'area_ha', headerName: 'Área em Hectares', width: 180 },
  { field: 'espacament', headerName: 'Espaçamento', width: 150 },
  { field: 'estande', headerName: 'Estande', width: 130 },
  { field: 'n_de_plantas', headerName: 'Número de Plantas', width: 170 },
  { field: 'ano_plantio', headerName: 'Ano de Plantio', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 }, // Adicionei a coluna de status
];

function ListGadoLeite() {  // Alterei o nome da função para ListGadoLeite
  const [gadosLeite, setGadosLeite] = useState([]);  // Alterei o nome do estado para gadosLeite
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestGadosLeite = async () => {  // Alterei o nome da função para requestGadosLeite
    setLoading(true);
    try {
      const response = await api.get("/gadosLeite", {  // Alterei a rota para "/gadosLeite"
        params: {
          nome: query.get("nome"),
        },
      });
      setGadosLeite(response.data.gadosLeite);  // Alterei o nome do estado para gadosLeite
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosLeite();  // Alterei a chamada da função para requestGadosLeite
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função de filtro
  const filterGadosLeiteByStatus = (gadosLeite, status) => {  // Alterei o nome da função para filterGadosLeiteByStatus
    if (status === "COLHIDOS") {
      return gadosLeite.filter((gadoLeite) => gadoLeite.status === "COLHIDO");
    } else if (status === "PLANTADOS") {
      return gadosLeite.filter((gadoLeite) => gadoLeite.status === "PLANTADO");
    } else {
      return gadosLeite; // Retorna todos os gadosLeite se nenhum status for selecionado
    }
  };

  const filterGadosLeiteBySearch = (gadosLeite, searchTerm) => {  // Alterei o nome da função para filterGadosLeiteBySearch
    return gadosLeite.filter((gadoLeite) =>
      gadoLeite.talhao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Atualiza gadosLeite com base no filtro
  const filteredGadosLeite = filterGadosLeiteByStatus(gadosLeite, filtro);
  
  const searchedGadosLeite = filterGadosLeiteBySearch(filteredGadosLeite, search);

  return (
    <div className={styles.container}>
      <h1>Gado de Leite</h1>  {/* Alterei o título para "Gado de Leite" */}
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
          rows={searchedGadosLeite}
          columns={[
            {
              field: 'details',
              headerName: 'Detalhes',
              width: 100,
              renderCell: (params) => (
                <Link to={`/GadoLeitePage/${params.row.id}`} style={{ textDecoration: 'none' }}>  {/* Alterei a rota para "/GadoLeitePage" */}
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

export default ListGadoLeite;  // Alterei o nome da exportação para ListGadoLeite
