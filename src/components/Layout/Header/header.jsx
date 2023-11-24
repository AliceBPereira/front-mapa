// Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import Gaveta from '../Sidebar/sidebar';

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
            onMouseEnter={() => setShowSubMenu(true)}
            onMouseLeave={() => setShowSubMenu(false)}
          >
            <div className="link">Detalhes Lista</div>
            {/* Submenu que aparece ao passar o mouse sobre "Detalhes Lista" */}
            {showSubMenu && (
              <ul className="submenu">
                <li><Link to="/CafeList">Cafe</Link></li>
                <li><Link to="/MilhoList">Milho</Link></li>
              </ul>
            )}
          </li>
          
        </ul>
      </nav>
    </header>
  );
}

export default Header;

