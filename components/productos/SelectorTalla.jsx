import { Box, Button } from "@mui/material"


export const SelectorTalla = ( {tallas, tallaSeleccionada} ) => {
  return (
    <Box>
       {
        tallas.map( talla => (
          <Button 
            key={ talla }
            size="small"
            sx={{ marginTop: '5px' }}
            color={ tallaSeleccionada === talla ? 'primary' : 'white' }
          >
            { talla }
          </Button>
        ) )
       } 
    </Box>
  )
}