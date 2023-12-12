import React, { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { api } from "../../../lib/axios";
import ListCafe from "./grraficoCafe";
import "./listcafe.css";

const CafeList = () => {
  const [cafes, setCafes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [talhoesSelecionados, setTalhoesSelecionados] = useState([]);
  const [chartType, setChartType] = useState("Line");

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
  const handleChartTypeChange = (newType) => {
    setChartType(newType);
  };

  // Filtrar todos os talhões PLANTADOS
  const plantados = cafes.filter((cafe) => cafe.status === "PLANTADO");

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
  const talhoesFiltrados = cafes.filter((cafe) =>
    talhoesSelecionados.includes(cafe.talhao)
  );
// Agrupar informações por talhão
const dadosPorTalhao = {};
talhoesFiltrados.forEach((cafe) => {
  if (!dadosPorTalhao[cafe.talhao]) {
    dadosPorTalhao[cafe.talhao] = { anos: [], quantidades: [] };
  }
  dadosPorTalhao[cafe.talhao].anos.push(cafe.ano_plantio.toString());
  dadosPorTalhao[cafe.talhao].quantidades.push(cafe.quantidade_colhida);
});

// Ordenar os dados por ano de plantio em ordem crescente
Object.keys(dadosPorTalhao).forEach((talhao) => {
 
  const quantidades = dadosPorTalhao[talhao].quantidades;
  const anos = dadosPorTalhao[talhao].anos;

  const ordenado = anos.map((ano, index) => ({ano, quantidade: quantidades[index]}))
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
    <div className="Grafico">
      <div>
        <label>
          <input
            type="radio"
            value="Line"
            checked={chartType === "Line"}
            onChange={() => handleChartTypeChange("Line")}
          />
          Line
        </label>
        <label>
          <input
            type="radio"
            value="Pie"
            checked={chartType === "Pie"}
            onChange={() => handleChartTypeChange("Pie")}
          />
          Pie
        </label>
        <label>
          <input
            type="radio"
            value="Bar"
            checked={chartType === "Bar"}
            onChange={() => handleChartTypeChange("Bar")}
          />
          Line
        </label>
      </div>
      {chartData[0].length < 2 ? (
        <div>Por favor, selecione pelo menos um talhão.</div>
      ) : (
        <Chart
        chartType={chartType === "Line" ? "LineChart" : chartType === "Pie" ? "PieChart" : "BarChart"}
          width="100%"
          height="400px"
          data={chartData}
          options={options}
        />
      )}
      <div className="Plantados">
        <h3>Talhões Plantados</h3>
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
        <ListCafe/>
      </div>
    </div>
  );
};

export default CafeList;
