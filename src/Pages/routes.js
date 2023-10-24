import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './home';
import About from './sobre';
const AppRoutes = () => {
    return (
        
        <Router>
          <div className='App'>
            <Link to='/home'>Home</Link>
            <Link to='/about'>About</Link>
          </div>
          <Routes>
            <Route  path='/home' component={Home} />
            <Route path='/about' component={About} />
          </Routes>
        </Router>
      );
  };
  
  export default AppRoutes;