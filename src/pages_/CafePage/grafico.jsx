import React, { useState, useEffect } from "react";

function CafeList() {
  const [cafes, setCafes] = useState([]);
  const [talhao, setTalhao] = useState(""); // O talhão a ser filtrado

  useEffect(() => {
    // Função para buscar cafés colhidos com base no talhão
    async function fetchCafes() {
      try {
        const response = await fetch(`/api/cafes?talhao=${talhao}&estatuto=COLHIDO`);
        if (response.ok) {
          const data = await response.json();
          setCafes(data.cafés);
        } else {
          console.error("Erro ao buscar cafés");
        }
      } catch (error) {
        console.error("Erro ao buscar cafés", error);
      }
    }

    // Chame a função de busca quando o talhao mudar
    if (talhao !== "") {
      fetchCafes();
    } else {
      // Limpe a lista de cafés se o campo do talhão estiver vazio
      setCafes([]);
    }
  }, [talhao]);

  return (
    <div>
      <h1>Cafés Colhidos</h1>
      <input
        type="text"
        placeholder="Nome do talhão (por exemplo, T-1)"
        value={talhao}
        onChange={(e) => setTalhao(e.target.value)}
      />
      <ul>
        {cafes.map((cafe) => (
          <li key={cafe.id}>
            <p>Nome do Talhão: {cafe.talhao}</p>
            <p>Outras informações do café</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CafeList;
