import * as React from 'react';
import { useState, useEffect } from 'react'; // Adicione estas importações
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button'; // Importe o componente Button do Material-UI
import { api } from "../src/lib/axios";

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const GadoCorteButtons = () => {
  console.log(useState);

  const [gadosCorte, setGadosCorte] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedGadoCorte, setSelectedGadoCorte] = useState(null);

  const requestGadosCorte = async () => {
    setLoading(true);
    try {
      const response = await api.get('/gadosCorte');
      setGadosCorte(response.data.gadosCorte);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    requestGadosCorte();
  }, []);

  if (loading) {
    return <></>;
  }

  const handleGadoCorteClick = (gadoCorte) => {
    setSelectedGadoCorte(gadoCorte);
  };

  return (
    <>
      {gadosCorte.map((gadoCorte, index) => (
        <Button
          key={index}
          variant="contained"
          color="primary"
          onClick={() => handleGadoCorteClick(gadoCorte)}
        >
          {gadoCorte.Nome_pasto}
        </Button>
      ))}
      {selectedGadoCorte && (
        <div>
          <strong>Nome_pasto:</strong>
          <span>{selectedGadoCorte.Nome_pasto}</span>
          <strong>ÁREA EM HECTARES: </strong>
          <span>{selectedGadoCorte.area_ha}</span>
          <strong>Forrageira: </strong>
          <span>{selectedGadoCorte.Forrageira}</span>
          <strong>Raca: </strong>
          <span>{selectedGadoCorte.Raca}</span>
          <strong>Pastejo: </strong>
          <span>{selectedGadoCorte.Pastejo}</span>
        </div>
      )}
    </>
  );
};

export default function Gaveta() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex', position: 'absolute', zIndex: 9999, top: '15%', left: '15px' }}>
      <CssBaseline />
      <IconButton
        color="primary" // Corrija a cor para 'primary'
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
        <GadoCorteButtons />
        <Divider />
      </Drawer>
    </Box>
  );
}
