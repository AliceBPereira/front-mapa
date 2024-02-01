import React from "react";
import CafeList from "./cafe/coffee-metrics";
import MilhoList from "./milho/milho-metrics";
import CaprinoOvinoList from "./caprinoOvino/caprinoOvino-metrics";


function DetalhesListaPage() {
  
  return (
    <div>
      
      <div><CafeList/></div>
      <div><MilhoList/></div>
      <div><CaprinoOvinoList/></div>
      
    </div>
  );
}

export default DetalhesListaPage;
