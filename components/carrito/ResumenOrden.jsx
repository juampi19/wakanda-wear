import { Grid, Typography } from "@mui/material"

export const ResumenOrden = () => {
  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>3 productos</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ `$${30000}` }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos (15%)</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{`$${3500}`}</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{`$${35000}`}</Typography>
      </Grid>

    </Grid>
  )
}
