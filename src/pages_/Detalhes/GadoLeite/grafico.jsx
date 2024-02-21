import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import styles from './grafico.module.scss';

const Grafico = ({ talhaoId }) => {
  const [gadosLeite, setGadosLeite] = useState([]);
  const [loading, setLoading] = useState(false);
  const [metricaSelecionada, setMetricaSelecionada] = useState("quantidade_colhida");
  const [chartType, setChartType] = useState("Line");
  
  const requestGadosLeite = async () => {
    setLoading(true);
    try {
      const response = await api.get("/gadosLeite");
      setGadosLeite(response.data.gadosLeite);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosLeite();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  // Filtrar os talhões COLHIDOS de acordo com o talhão do ID
  const filteredGadosLeite = gadosLeite.filter(
    (gadoLeite) => gadoLeite.status === "COLHIDO" && gadoLeite.talhao === talhaoId
  );
  
  filteredGadosLeite.sort((a, b) => parseInt(a.plantio_20) - parseInt(b.plantio_20));
  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  filteredGadosLeite.forEach((gadoLeite) => {
    chartData.push([gadoLeite.plantio_20, gadoLeite.quantidade_colhida]);
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
            {/* Adicione outros tipos de gráficos conforme necessário */}
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
