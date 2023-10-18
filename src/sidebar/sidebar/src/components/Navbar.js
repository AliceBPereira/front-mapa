import React, {useState} from "react";
import IconContext from 'react-icons';
import * as FaIcons from 'react-icons';
import * as AiIcons from 'react-icons';
import Link from 'react-router-dom';
import SidebarData from './SidebarData'

function Navbar(){
    const [sidebar, setsidebar] = useState(false);
    const showsidebar = () => setsidebar(!sidebar);
    return (
        <>
            <IconContext.Provider value={{ color: '#fff' }}/>
                <div clssName= "menu-bars">
                    <Link to="#" className="navbar">
                    <FaIcons.FaBars onclick={showsidebar}/>

                    </Link>
                    <nav className={sidebar? 'nav-bar: active': 'nav-menu'}>
                        <ul className='nav-menu items' onClick={showsidebar}>
                            <li className='navbar-togle'>
                                <link to = "#"className="menu-bars">
                                    <AiIcons.AiFlineClose/>
                                </link>
                            </li>
                            {SidebarData.map((item, index) =>{
                                return(
                                    <li key={index} className={item.cName}>
                                        <Link to={item.path} className="topath">
                                            {item.icon}
                                            <span>{item.title}</span>
                                        </Link>
                                    </li>
                                )
                            })}

                        </ul>

                    </nav>
                    
                </div>

            
        </>
    )
}
export default Navbar