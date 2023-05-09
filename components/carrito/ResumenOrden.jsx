import { CarritoContext } from "@/context"
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

export const ResumenOrden = () => {

  const { numeroProductos, subtotal, impuesto, total } = useContext( CarritoContext );

  const formatPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ numeroProductos } { numeroProductos > 1 ? 'productos' : 'producto' }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ formatPrice.format( subtotal ) }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({ Number( process.env.NEXT_PUBLIC_IMPUESTO ) * 100 }%)</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ formatPrice.format( impuesto ) }</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{ formatPrice.format( total ) }</Typography>
      </Grid>

    </Grid>
  )
}
