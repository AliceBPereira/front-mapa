import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";

import styles from '../style/grafico.module.scss'

const Grafico = ({ talhaoId }) => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metricaSelecionada, setMetricaSelecionada] = useState("quantidade_colhida");
  const [chartType, setChartType] = useState("Line"); // Default chart type is Line
  
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

  // Filtrar os talhões COLHIDOS de acordo com o talhão do ID
  const filteredCafes = cafes.filter(
    (cafe) => cafe.status === "COLHIDO" && cafe.talhao === talhaoId
  );

  // Ordenar os cafés com base no ano de plantio
  filteredCafes.sort((a, b) => parseInt(a.ano_plantio) - parseInt(b.ano_plantio));

  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Métrica Selecionada"]];
  filteredCafes.forEach((cafe) => {
    chartData.push([cafe.ano_plantio.toString(), cafe[metricaSelecionada]]);
  });

  const options = {
    title: `Quantidade Colhida de Cafés por hectare para os Talhões por Data de Plantio em unidades`,
  };

  
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
              <option value="quantidade_colhida">Quantidade Colhida</option>
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
