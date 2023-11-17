import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import { api } from "../../lib/axios";


const Grafico = () => {


  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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

  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  cafes.forEach((cafe) => {
    if (cafe.status === "COLHIDO" && cafe.talhao) {
      chartData.push([cafe.talhao.data_plantio, cafe.quantidade_colhida]);
    }
  });

  const options = {
    chart: {
      title: "Quantidade Colhida de Cafés por Data de Plantio",
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
}

export default Grafico;
