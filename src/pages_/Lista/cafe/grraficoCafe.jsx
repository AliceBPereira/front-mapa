// Inside Grafico.js
import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";

const Grafico = ({ filteredCafes }) => {
  console.log("Filtered Cafes:", filteredCafes);
  const talhaoData = {};

  filteredCafes.forEach((cafe) => {
    if (!talhaoData[cafe.talhao]) {
      talhaoData[cafe.talhao] = {
        label: cafe.talhao,
        data: [["Data", "Quantidade Colhida"]],
      };
    }

    talhaoData[cafe.talhao].data.push([
      cafe.ano_plantio,
      cafe.quantidade_colhida,
    ]);
  });

  // Transformar os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  Object.keys(talhaoData).forEach((talhao) => {
    chartData.push(...talhaoData[talhao].data);
  });

  const options = {
    chart: {
      title: `Quantidade Colhida de Cafés por Talhão e Data de Plantio`,
      subtitle: "em unidades",
    },
    colors: Object.keys(talhaoData).map(() => getRandomColor()),
  };

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  console.log("ChartData:", chartData);
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
