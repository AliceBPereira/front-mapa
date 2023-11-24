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
  
  // Ordenar os cafés com base no ano de plantio
  filteredCafes.sort((a, b) => parseInt(a.ano_plantio) - parseInt(b.ano_plantio));
  
  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];
  
  filteredCafes.forEach((cafe) => {
    chartData.push([cafe.ano_plantio.toString(), cafe.quantidade_colhida]);
  });

  const options = {
    chart: {
      title: `Quantidade Colhida de Cafés para o Talhão ${talhaoId} por Data de Plantio`,
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
