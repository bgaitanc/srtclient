import React from 'react';
import { Backdrop, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

interface Props {
  show: boolean;
}

const CircularLoading: React.FC<Props> = (props) => {
  const { show } = props;

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={show}
      className="!bg-black/70 flex flex-col items-center justify-center"
    >
      <CircularProgress color="inherit" size={60} thickness={5} />
      <Typography
        variant="h6"
        component="p"
        className="mt-4 text-white text-lg"
      >
        Cargando... Por favor, espera
      </Typography>
    </Backdrop>
  );
};
export default CircularLoading;
