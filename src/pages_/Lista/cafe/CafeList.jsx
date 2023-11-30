import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";

const CafeList = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [talhoesSelecionados, setTalhoesSelecionados] = useState([]);

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

  // Filtrar todos os talhões PLANTADOS
  const plantados = cafes.filter((cafe) => cafe.status === "PLANTADO");

  // Adicionar talhões selecionados à lista
  const handleTalhaoSelecionado = (talhao) => {
    setTalhoesSelecionados((prevSelecionados) => [...prevSelecionados, talhao]);
  };

  // Filtrar talhões selecionados
  const talhoesFiltrados = cafes.filter((cafe) =>
    talhoesSelecionados.includes(cafe.talhao)
  );

  // Agrupar informações por talhão
  const dadosPorTalhao = {};
  talhoesFiltrados.forEach((cafe) => {
    if (!dadosPorTalhao[cafe.talhao]) {
      dadosPorTalhao[cafe.talhao] = [];
    }
    dadosPorTalhao[cafe.talhao].push([cafe.ano_plantio.toString(), cafe.quantidade_colhida]);
  });

  // Manipular os dados para o formato desejado
  const chartData = [["Data", "Quantidade Colhida"]];

  Object.keys(dadosPorTalhao).forEach((talhao) => {
    chartData.push(...dadosPorTalhao[talhao]);
  });

  const options = {
    chart: {
      title: `Quantidade Colhida de Cafés para os Talhões por Data de Plantio`,
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
    <div>
      <Chart
        chartType="Line"
        width="100%"
        height="400px"
        data={chartData}
        options={options}
      />
      <div>
        <h3>Talhões Plantados</h3>
        <ul>
          {plantados.map((talhao) => (
            <li key={talhao.talhao}>
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
  );
};

export default CafeList;
