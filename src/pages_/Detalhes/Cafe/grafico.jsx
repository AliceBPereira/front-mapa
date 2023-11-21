import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";

const Grafico = ({ talhaoId }) => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);

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

  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  filteredCafes.forEach((cafe) => {
    
    chartData.push([cafe.ano_plantio, cafe.quantidade_colhida]);
  });

  const options = {
    chart: {
      title: `Quantidade Colhida de Cafés para o Talhão ${talhaoId} por Data de Plantio`,
      subtitle: "em unidades",
    },
  };

  return (
    <Chart
      chartType="Line"
      width="100%"
      height="400px"
      data={chartData}
      options={options}
    />
  );
};

export default Grafico;
