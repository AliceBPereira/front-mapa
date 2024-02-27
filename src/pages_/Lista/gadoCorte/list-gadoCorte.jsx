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

function ListGadoCorte() { // Alterado o nome da função
  const [gadosCortes, setGadosCortes] = useState([]); // Alterado o nome do estado
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filtro, setFiltro] = useState("PLANTADOS"); // Inicialmente, configurado como "PLANTADOS"

  const useQuery = () => {
    return new URLSearchParams(useLocation().search);
  };

  let query = useQuery();

  const requestGadosCortes = async () => { // Alterado o nome da função
    setLoading(true);
    try {
      const response = await api.get("/gadosCortes", {
        params: {
          nome: query.get("nome"),
        },
      });
      setGadosCortes(response.data.gadosCortes); // Alterado o nome da variável
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosCortes(); // Alterado o nome da função
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Função de filtro
  const filterGadosCortesByStatus = (gadosCortes, status) => { // Alterado o nome da função
    if (status === "COLHIDOS") {
      return gadosCortes.filter((gadoCorte) => gadoCorte.status === "COLHIDO"); // Alterado o nome da variável
    } else if (status === "PLANTADOS") {
      return gadosCortes.filter((gadoCorte) => gadoCorte.status === "PLANTADO"); // Alterado o nome da variável
    } else {
      return gadosCortes; // Retorna todos os cafés se nenhum status for selecionado
    }
  };

  const filterGadosCortesBySearch = (gadosCortes, searchTerm) => { // Alterado o nome da função
    return gadosCortes.filter((gadoCorte) =>
      gadoCorte.talhao.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  // Atualiza cafés com base no filtro
  const filteredGadosCortes = filterGadosCortesByStatus(gadosCortes, filtro); // Alterado o nome da variável
  
  const searchedGadosCortes = filterGadosCortesBySearch(filteredGadosCortes, search); // Alterado o nome da variável

  return (
    <div className={styles.container}>
      <h1>Gado de Corte</h1> {/* Alterado o título */}
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
          rows={searchedGadosCortes} // Alterado o nome da variável
          columns={[
            {
              field: 'details',
              headerName: 'Detalhes',
              width: 100,
              renderCell: (params) => (
                <Link to={`/GadoCortePage/${params.row.id}`} style={{ textDecoration: 'none' }}>
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

export default ListGadoCorte; // Alterado o nome do componente
