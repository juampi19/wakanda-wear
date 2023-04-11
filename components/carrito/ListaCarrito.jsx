import { DataInicial } from "@/database/productos"
import { Typography } from "@mui/material"

const productosCarrito = [
  DataInicial.productos[0],
  DataInicial.productos[1],
  DataInicial.productos[2],
]

export const ListaCarrito = () => {
  return (
    <>
      {
        productosCarrito.map( producto => (
          <Typography key={producto.slug}>{producto.titulo}</Typography>
         ) )
      }
    </>
  )
}
