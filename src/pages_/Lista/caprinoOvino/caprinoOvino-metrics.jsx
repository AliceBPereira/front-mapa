import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import ListCaprinoOvino from "./list-caprinoOvino";  // Importando o componente ListCaprinoOvino
import styles from './caprinoOvino-metrics.module.scss'  // Alterando o nome do arquivo de estilo

const CaprinoOvinoList = () => {  // Alterando o nome da função para CaprinoOvinoList
  const [caprinoOvinos, setCaprinoOvinos] = useState([]);  // Alterando o nome do estado para caprinosOvinos
  const [loading, setLoading] = useState(false);
  const [talhoesSelecionados, setTalhoesSelecionados] = useState([]);
  const [chartType, setChartType] = useState("Line");

  const requestCaprinoOvinos = async () => {  // Alterando o nome da função para requestCaprinosOvinos
    setLoading(true);
    try {
      const response = await api.get("/caprinoOvinos");  // Alterando a rota para "/caprinosOvinos"
      setCaprinoOvinos(response.data.caprinoOvinos);  // Alterando o nome do estado para caprinosOvinos
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestCaprinoOvinos();  // Alterando a chamada da função para requestCaprinosOvinos
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  // Filtrar todos os talhões PLANTADOS
  const plantados = caprinoOvinos.filter((caprinoOvino) => caprinoOvino.status === "PLANTADO");

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
  const talhoesFiltrados = caprinoOvinos.filter((caprinoOvino) =>
    talhoesSelecionados.includes(caprinoOvino.talhao)
  );

  // Agrupar informações por talhão
  const dadosPorTalhao = {};
  talhoesFiltrados.forEach((caprinoOvino) => {
    if (!dadosPorTalhao[caprinoOvino.talhao]) {
      dadosPorTalhao[caprinoOvino.talhao] = { anos: [], quantidades: [] };
    }
    dadosPorTalhao[caprinoOvino.talhao].anos.push(caprinoOvino.ano_plantio.toString());
    dadosPorTalhao[caprinoOvino.talhao].quantidades.push(caprinoOvino.quantidade_colhida);
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
      title: `Quantidade Colhida de CaprinoOvinos para os Talhões por Data de Plantio`,
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
      <div className="Lista">
        <ListCaprinoOvino />  {/* Renderizando o componente ListCaprinoOvino */}
      </div>
    </div>
  );
};

export default CaprinoOvinoList;  // Alterando o nome da exportação para CaprinoOvinoList
