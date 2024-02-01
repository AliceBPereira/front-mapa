import React from "react";
import CafeList from "./cafe/coffee-metrics";
import MilhoList from "./milho/milho-metrics";


function DetalhesListaPage() {
  
  return (
    <div>
      
      <div><CafeList/></div>
      <div><MilhoList/></div>
      
    </div>
  );
}

export default DetalhesListaPage;
