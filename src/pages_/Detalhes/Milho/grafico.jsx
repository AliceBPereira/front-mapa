import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import styles from './grafico.module.scss'
const Grafico = ({ talhaoId }) => {
  const [milhos, setMilhos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metricaSelecionada, setMetricaSelecionada] = useState("quantidade_colhida");
  const [chartType, setChartType] = useState("Line");
  
  const requestCafes = async () => {
    setLoading(true);
    try {
      const response = await api.get("/milhos");
      setMilhos(response.data.milhos);
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

  // Filtrar os talhões COLHIDOS de acordo com o talhão do ID
  const filteredMilhos = milhos.filter(
    (milho) => milho.status === "COLHIDO" && milho.talhao === talhaoId
  );
  
  filteredMilhos.sort((a, b) => parseInt(a.ano_plantio) - parseInt(b.ano_plantio));
  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  filteredMilhos.forEach((milho) => {
    
    chartData.push([milho.plantio_20, milho.quantidade_colhida]);
  });

  const options = {
    chart: {
      title: `Comparação da Métrica "${metricaSelecionada}" para o Talhão ${talhaoId} por Data de Plantio`,
      subtitle: "em unidades",
    },
    colors: Object.keys(talhaoId).map(() => getRandomColor()),
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
    <div>
      <div className={styles.form}>
        <div className={styles.select}>
          <label>
            Selecione a métrica:
          </label>
          <select
              value={metricaSelecionada}
              onChange={(e) => setMetricaSelecionada(e.target.value)}
            >
              <option value="quantidprod_2020">Quantidade Colhida</option>
              <option value="n_de_plantas">Número de Plantas</option>
              {/* Adicione outras opções conforme necessário */}
            </select>
        </div>
        <div className={styles.select}>
          <label>
            Selecione o tipo de gráfico:
          </label>
          <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
            >
              <option value="Line">Line</option>
              <option value="Pie">Pie</option>
              <option value="Bar">Bar</option>
              {/* Add other chart types as needed */}
            </select>
        </div>
       
      </div>

      <Chart
        chartType={chartType === "Line" ? "LineChart" : chartType === "Pie" ? "PieChart" : "BarChart"}
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
    </div>
  );
};


export default Grafico;
