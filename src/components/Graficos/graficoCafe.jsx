import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { api } from "../../lib/axios";

function GraficoCafe() {
  const [optionsBar, setOptionsBar] = useState({
    title: 'Gráfico do numero de plantas'
  });
  const [data, setData] = useState([]); // Dados para o gráfico de pizza
  const [dataBar, setDataBar] = useState([]); // Dados para o gráfico de barras

  useEffect(() => {
  
    const fetchData = async () => {
      try {
        const response = await api.get('/cafes'); 
        const cafesData = response.data.cafes;

        const barChartData = cafesData.map(coffee => [coffee.talhao, coffee.n_de_plantas]);
        
        setDataBar([['Talhão', 'numero de plantas']].concat(barChartData));
      } catch (err) {
        console.log(err);
      }
    };

    fetchData(); // Chama a função de busca de dados quando o componente é montado
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex" }}>
          
          <Chart
          position= "absolute"
          z-index= {'9999'}
          transform={'translateX(-100%)'} 
          top= {'0'}
          left= {'0'}
          display= "flex"
            width={'300px'}
            height={'100vh'}
            chartType="BarChart"
            data={dataBar}
            options={optionsBar}
          />
        </div>
      </header>
    </div>
  );
}

export default GraficoCafe;
