import { Grid } from "@mui/material"
import { CardProducto } from "."


export const ListaProductos = ({ productos }) => {
  return (
    <Grid container spacing={4}>
      {
        productos.map( producto => (
          <CardProducto 
            key={producto.slug}
            producto={producto}
          />
        ) )
      }
    </Grid>
  )
}
