import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material"
import { Box, IconButton, Typography } from "@mui/material"



export const Contador = () => {
  return (
    <Box display={'flex'} alignContent={'center'}>
      <IconButton>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}> 1 </Typography>
      <IconButton>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}
