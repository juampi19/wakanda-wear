import { Box, Button } from "@mui/material"


export const SelectorTalla = ( {tallas, tallaSeleccionada, onTallaSeleccionada} ) => {
  return (
    <Box>
       {
        tallas.map( talla => (
          <Button 
            key={ talla }
            size="small"
            sx={{ marginTop: '5px' }}
            color={ tallaSeleccionada === talla ? 'primary' : 'white' }
            onClick={ () => onTallaSeleccionada( talla ) }
          >
            { talla }
          </Button>
        ) )
       } 
    </Box>
  )
}
