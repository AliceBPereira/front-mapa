/* Estilos para o header */
const headerStyle = {
    backgroundColor: 'green',
    color: 'black',
    padding: '6px 0',
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000,
  };
  
  /* Estilos para a lista de navegação */
  const navStyle = {
    display: 'flex', /* Torna os elementos filhos flexíveis (para alinhar horizontalmente) */
    listStyle: 'none',
  };
  
  /* Estilos para os itens da lista */
  const listItemStyle = {
    margin: '0 20px', /* Define margem igual à esquerda e à direita dos elementos da lista */
  };
  
  /* Estilos para links */
  const linkStyle = {
    textDecoration: 'none',
    color: 'black',
    fontFamily: 'Verdana, sans-serif', /* Altere 'Verdana' para a fonte desejada */
  };
  
  function Header() {
    return (
      <header style={headerStyle}>
        <nav>
          <ul style={navStyle}>
            <li style={listItemStyle}><a href="/" style={linkStyle}>Página Inicial</a></li>
            <li style={listItemStyle}><a href="/CafePage" style={linkStyle}>Detalhes</a></li>
            
          </ul>
        </nav>
      </header>
    );
  }
  
  export default Header;
  