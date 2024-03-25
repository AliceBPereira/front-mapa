// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import logo from './img logo/logo_vdd_pci-removebg-preview.png'

function Header() {
  // Estado para controlar a visibilidade do submenu
  const [showSubMenu, setShowSubMenu] = useState(false);


  return (
    <header className="header">
      <nav>
      
        <ul className="nav">
       
          <li className="listItem">
            <Link to="/" className="link">Mapa</Link>
          </li>
          <li
            className="listItem"
            onClick={() => setShowSubMenu(state => !state)}
          >
            <div className="link">
              Métricas

              <ul className={`submenu ${showSubMenu && 'listItem-active'}`}>
                <li><Link to="/CafeList">Café</Link></li>
                <li><Link to="/MilhoList">Milho</Link></li>
                <li><Link to="/CaprinoOvinoList">Caprino Ovino</Link></li>
                <li><Link to="/GadoCorteList">Gado Corte</Link></li>
                <li><Link to="/GadoLeiteList">Gado Leite</Link></li>
              </ul>

            </div>
            {/* Submenu que aparece ao passar o mouse sobre "Detalhes Lista" */}
          </li>
        </ul>
      </nav>
    </header >
  );
}

export default Header;

