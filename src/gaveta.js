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

import GraficoCafe from './components/Graficos/graficoCafe';


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

  const toggleGrafico = () => {
    setGraficoOpen(!graficoOpen); // Alternar entre abrir e fechar o gráfico
  };

  return (
    <Box sx={{ display: 'flex', position: 'absolute', zIndex: 9999, top: '15%', left: '15px' }}>
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
        <li><a href="/CafePage">Detalhes</a></li>
        <Divider />
      </Drawer>

      {/* Renderiza o gráfico quando o estado graficoOpen for verdadeiro */}
      {graficoOpen && (
        <div>
          <GraficoCafe />
        </div>
      )}
    </Box>
  );
}
<li><a href="/CafePage">Detalhes</a></li>