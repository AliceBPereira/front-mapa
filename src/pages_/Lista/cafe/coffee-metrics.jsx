import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import ListCafe from "./list-coffee";
import { ListMiniMap } from "../../../components/list-mini-map/list-mini-map";

import styles from '../style/metrics.module.scss'

const CafeList = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [talhoesSelecionados, setTalhoesSelecionados] = useState([]);
  const [chartType, setChartType] = useState("Line");

  const requestCafes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/cafes");
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
  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  // Filtrar todos os talhões PLANTADOS
  const plantados = cafes.filter((cafe) => cafe.status === "PLANTADO");

  // Adicionar talhões selecionados à lista
const handleTalhaoSelecionado = (talhao) => {
  setTalhoesSelecionados((prevSelecionados) => {
    if (prevSelecionados.includes(talhao)) {
      // Se o talhão já estiver selecionado, remova-o da lista
      return prevSelecionados.filter((t) => t !== talhao);
    } else {
      // Se o talhão não estiver selecionado, adicione-o à lista
      return [...prevSelecionados, talhao];
    }
  });
};

  // Filtrar talhões selecionados
  const talhoesFiltrados = cafes.filter((cafe) =>
    talhoesSelecionados.includes(cafe.talhao)
  );

// Agrupar informações por talhão
  const dadosPorTalhao = {};
  talhoesFiltrados.forEach((cafe) => {
    if (!dadosPorTalhao[cafe.talhao]) {
      dadosPorTalhao[cafe.talhao] = { anos: [], quantidades: [] };
    }
    dadosPorTalhao[cafe.talhao].anos.push(cafe.ano_plantio.toString());
    dadosPorTalhao[cafe.talhao].quantidades.push(cafe.quantidade_colhida);
});

// Ordenar os dados por ano de plantio em ordem crescente
  Object.keys(dadosPorTalhao).forEach((talhao) => {
 
  const quantidades = dadosPorTalhao[talhao].quantidades;
  const anos = dadosPorTalhao[talhao].anos;

  const ordenado = anos.map((ano, index) => ({ano, quantidade: quantidades[index]}))
    .sort((a, b) => a.ano - b.ano);

  dadosPorTalhao[talhao].anos = ordenado.map(item => item.ano);
  dadosPorTalhao[talhao].quantidades = ordenado.map(item => item.quantidade);
});
  
  // Manipular os dados para o formato desejado
  const chartData = [["Data"]];

  Object.keys(dadosPorTalhao).forEach((talhao) => {
    chartData[0].push(talhao);
  });

  if (dadosPorTalhao[talhoesSelecionados[0]]) {
    dadosPorTalhao[talhoesSelecionados[0]].anos.forEach((ano, index) => {
      let row = [ano];
      Object.keys(dadosPorTalhao).forEach((talhao) => {
        row.push(dadosPorTalhao[talhao].quantidades[index] || 0);
      });
      chartData.push(row);
    });
  }
  
  const coordenadas = talhoesFiltrados.map(talhao => talhao.localizacao.coordenadas)
  
  const options = {
    title: `Quantidade Colhida de Cafés por hectare para os Talhões por Data de Plantio em unidades`,
  };
  
  return (
    <div className={styles.container}>
      <h1 className={styles.titulo}>Métricas dos talhões de café</h1>
      <div className={styles.content}>
        <div className={styles.graph}>
          <div >
            <h2>Gráfico</h2>
            <h3>Selecione um tipo de gráfico</h3>
            <label>
              <input
                type="radio"
                value="Line"
                checked={chartType === "Line"}
                onChange={() => handleChartTypeChange("Line")}
              />
              Linha
            </label>
            
            <label>
              <input
                type="radio"
                value="Bar"
                checked={chartType === "Bar"}
                onChange={() => handleChartTypeChange("Bar")}
              />
              Barras
            </label>
          </div>
          <div className={styles.chart}>
            {chartData[0].length < 2 ? (
              <div className={styles.noData}>Sem dados.</div>
            ) : (
              <Chart
                chartType={chartType === "Line" ? "LineChart" : "BarChart"}
                width="100%"
                height="100%"
                data={chartData}
                options={options}
              /> 
            )}
          </div>
          
          <div className={styles.selectCoffee}>
            <h3>Selecione um ou mais talhões plantados:</h3>
            <ul>
              {plantados.map((talhao) => (
                <li key={`${talhao.id}-${talhao.talhao}`}>
                  <label>
                    <input
                      type="checkbox"
                      checked={talhoesSelecionados.includes(talhao.talhao)}
                      onChange={() => handleTalhaoSelecionado(talhao.talhao)}
                    />
                    {talhao.talhao}
                    
                    
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className={styles.map}>
          { talhoesFiltrados.length > 0 && (<ListMiniMap coordinates={coordenadas}/>) }
        </div>
      </div>

      <div className="Lista">
        <ListCafe cafes={cafes}/>
      </div>
    </div>
  );
};

export default CafeList;