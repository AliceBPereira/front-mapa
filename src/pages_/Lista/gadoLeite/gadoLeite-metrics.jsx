import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import ListGadoLeite from "./list-gadoLeite";  // Alterando o nome do componente
import styles from '../style/metrics.module.scss' // Alterando o nome do módulo

const GadoLeiteList = () => {  // Alterando o nome da função
  const [gadosLeite, setGadosLeite] = useState([]);  // Alterando o nome do estado
  const [loading, setLoading] = useState(false);
  const [talhoesSelecionados, setTalhoesSelecionados] = useState([]);
  const [chartType, setChartType] = useState("Line");

  const requestGadosLeite = async () => {  // Alterando o nome da função
    setLoading(true);
    try {
      const response = await api.get("/gadosLeite");  // Alterando a rota para "/gadosLeite"
      setGadosLeite(response.data.gadosLeite);  // Alterando o nome do estado
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosLeite();  // Alterando a chamada da função
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  // Filtrar todos os talhões PLANTADOS
  const plantados = gadosLeite.filter((gadoLeite) => gadoLeite.status === "PLANTADO");

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
  const talhoesFiltrados = gadosLeite.filter((gadoLeite) =>
    talhoesSelecionados.includes(gadoLeite.talhao)
  );

  // Agrupar informações por talhão
  const dadosPorTalhao = {};
  talhoesFiltrados.forEach((gadoLeite) => {
    if (!dadosPorTalhao[gadoLeite.talhao]) {
      dadosPorTalhao[gadoLeite.talhao] = { anos: [], quantidades: [] };
    }
    dadosPorTalhao[gadoLeite.talhao].anos.push(gadoLeite.ano_plantio.toString());
    dadosPorTalhao[gadoLeite.talhao].quantidades.push(gadoLeite.quantidade_colhida);
  });

  // Ordenar os dados por ano de plantio em ordem crescente
  Object.keys(dadosPorTalhao).forEach((talhao) => {
    const quantidades = dadosPorTalhao[talhao].quantidades;
    const anos = dadosPorTalhao[talhao].anos;

    const ordenado = anos.map((ano, index) => ({ ano, quantidade: quantidades[index] }))
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

  const options = {
    chart: {
      title: `Quantidade Colhida de Gados de Leite para os Talhões por Data de Plantio`,
      subtitle: "em unidades",
    },
    colors: talhoesSelecionados.map(() => getRandomColor()),
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  return (
    <div className={styles.container}>
      <div className={styles.graph}>
        <div>
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
              value="Pie"
              checked={chartType === "Pie"}
              onChange={() => handleChartTypeChange("Pie")}
            />
            Pizza
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
              chartType={chartType === "Line" ? "LineChart" : chartType === "Pie" ? "PieChart" : "BarChart"}
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
      <div className="Lista">
        <ListGadoLeite />  {/* Alterando o nome do componente */}
      </div>
    </div>
  );
};

export default GadoLeiteList;  // Alterando o nome da exportação
