import React, { useState } from 'react';
import { api } from '../../lib/axios';

const CadastroCafe = () => {
  const [cafe, setCafe] = useState({
    talhao: '',
    cultivar: '',
    area_ha: '',
    espacament: '',
    estande: '',
    n_de_plantas: '',
    ano_plantio: '',
    status: '',
    ult_colheita: '',
    prox_colheita: '',
    quantidade_colhida: '',
    localizacao: {
        coordenadas: []
      }
  });

  const handleChange = (e) => {
    setCafe({
      ...cafe,
      [e.target.name]: e.target.value
    });
  };

  const handleCoordenadasChange = (index, e) => {
    let coordenadas = [...cafe.localizacao.coordenadas];
    coordenadas[index] = e.target.value;
    setCafe({
      ...cafe,
      localizacao: {
        ...cafe.localizacao,
        coordenadas: coordenadas
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(cafe);
    api.post('/cafes', cafe)
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Talhão:
        <input type="text" name="talhao" onChange={handleChange} />
      </label>
      <label>
        Cultivar:
        <input type="text" name="cultivar" onChange={handleChange} />
      </label>
      <label>
        Área em Hectares:
        <input type="number" name="area_ha" onChange={handleChange} />
      </label>
      <label>
        Espaçamento:
        <input type="text" name="espacament" onChange={handleChange} />
      </label>
      <label>
        Estande:
        <input type="number" name="estande" onChange={handleChange} />
      </label>
      <label>
        Número de Plantas:
        <input type="number" name="n_de_plantas" onChange={handleChange} />
      </label>
      <label>
        Ano de Plantio:
        <input type="number" name="ano_plantio" onChange={handleChange} />
      </label>
      <label>
        Status:
        <select name="status" onChange={handleChange}>
          <option value="PLANTADO">Plantado</option>
          <option value="COLHIDO">Colhido</option>
        </select>
      </label>
      <label>
        Última Colheita:
        <input type="date" name="ult_colheita" onChange={handleChange} />
      </label>
      <label>
        Próxima Colheita:
        <input type="date" name="prox_colheita" onChange={handleChange} />
      </label>
      <label>
        Quantidade Colhida:
        <input type="number" name="quantidade_colhida" onChange={handleChange} />
      </label>
      <label>
        Coordenada 1:
        <input type="text" name="coordenada1" value={cafe.localizacao.coordenadas[0]} onChange={(e) => handleCoordenadasChange(0, e)} />
      </label>
      <label>
        Coordenada 2:
        <input type="text" name="coordenada2" value={cafe.localizacao.coordenadas[1]} onChange={(e) => handleCoordenadasChange(1, e)} />
      </label>
      <button type="submit">Cadastrar Café</button>
    </form>
  );
};

export default CadastroCafe;