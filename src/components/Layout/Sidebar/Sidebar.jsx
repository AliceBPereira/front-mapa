import * as React from 'react';

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import { SidebarData } from "./SidebarData.jsx";


const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Gaveta() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [graficoOpen, setGraficoOpen] = React.useState(false); // Estado para controlar a abertura do gráfico

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

 

  return (
    <Box sx={{ display: 'flex', position: 'absolute', zIndex: 9999, top: '15%', left: '15px'}}>
      <CssBaseline />
      <IconButton
        color="black"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{ mr: 2, ...(open && { display: 'none' }) }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Divider />
        <Divider />
        <div className="sidebar">
      <ul className="sidebarList">
        {SidebarData.map((val, key) => {
          return (
            <li
              key={key}
              className="row"
              onClick={() => {
                window.location.pathname = val.link;
              }}
            >
              
              <div className='titulo' >{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
        <Divider />
      </Drawer>

      {/* Renderiza o gráfico quando o estado graficoOpen for verdadeiro */}
      {graficoOpen && (
        <div>
          
        </div>
      )}
    </Box>
  );
}
