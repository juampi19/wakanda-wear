import { CarritoContext } from "@/context"
import { Grid, Typography } from "@mui/material"
import { useContext } from "react"

export const ResumenOrden = ({ ordenCantidad, ordneSubtotal, ordenImpuesto,ordenTotal }) => {

  const { numeroProductos, subtotal, impuesto, total } = useContext( CarritoContext );

  const formatPrice = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0,
    minimumFractionDigits: 0
  });

  const mostrarCantidad = ordenCantidad ? ordenCantidad : numeroProductos;
  const mostrarSubtotal = ordneSubtotal ? ordneSubtotal : subtotal;
  const mostrarImpuesto = ordenImpuesto ? ordenImpuesto : impuesto;
  const mostrarTotal = ordenTotal ? ordenTotal : total;

  return (
    <Grid container>
      <Grid item xs={6}>
        <Typography>No. Productos</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ mostrarCantidad } { mostrarCantidad > 1 ? 'productos' : 'producto' }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Subtotal</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ formatPrice.format( mostrarSubtotal ) }</Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography>Impuestos ({ Number( process.env.NEXT_PUBLIC_IMPUESTO ) * 100 }%)</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'}>
        <Typography>{ formatPrice.format( mostrarImpuesto ) }</Typography>
      </Grid>

      <Grid item xs={6} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">Total:</Typography>
      </Grid>

      <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{ mt: 2 }}>
        <Typography variant="subtitle1">{ formatPrice.format( mostrarTotal ) }</Typography>
      </Grid>

    </Grid>
  )
}
