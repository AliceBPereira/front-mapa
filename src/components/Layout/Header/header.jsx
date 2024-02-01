// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


function Header() {
  // Estado para controlar a visibilidade do submenu
  const [showSubMenu, setShowSubMenu] = useState(false);


  return (
    <header className="header">
      <nav>
        <ul className="nav">

          <li className="listItem">
            <Link to="/" className="link">Página Inicial</Link>
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

