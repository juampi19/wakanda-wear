import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"



export const Contador = ({ cantidadActual, actualizarCantidad, valorMaximo }) => {

  const aumentarContador = ( valor ) => {
    if( cantidadActual >= valorMaximo ) return;

    actualizarCantidad( valor );
  }


  const restarContador = ( valor ) => {

    if( cantidadActual <= 1 ) return;
    
    actualizarCantidad( valor );
  }


  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton
        
        onClick={ () => restarContador( cantidadActual -1) }
      >
        <RemoveCircleOutline/>
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}> {cantidadActual} </Typography>
      <IconButton
        onClick={ () => aumentarContador( cantidadActual +1) }
      >
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
