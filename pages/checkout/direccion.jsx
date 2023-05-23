import { TiendaLayout } from "@/components/layouts"
import { ciudades } from "@/utils"
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useForm } from "react-hook-form";
import Cookie from 'js-cookie';
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { CarritoContext } from "@/context";

import { NoSsr } from '@mui/base'

const obtenerDireccion = () => {
  return {
    nombre: Cookie.get('nombre') || '',
    apellido: Cookie.get('apellido') || '',
    direccion: Cookie.get('direccion') || '',
    direccion2: Cookie.get('direccion2') || '',
    codigo: Cookie.get('codigo') || '',
    ciudad: Cookie.get('ciudad') || '',
    pais: Cookie.get('pais') || '',
    telefono: Cookie.get('telefono') || '',
  }
}


const PaginaDireccion = () => {

  const router = useRouter();

  const { actualizarDireccion } = useContext(CarritoContext);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      nombre: '',
      apellido: '',
      direccion: '',
      direccion2: '',
      codigo: '',
      ciudad: '',
      pais: '',
      telefono: '',
    }
  });

  useEffect( () => {
    reset( obtenerDireccion() )
  }, [reset] )



  const onRevisarPedido = (data) => {

    actualizarDireccion(data);

    router.push('/checkout/resumen')
  }


  return (
    <TiendaLayout titulo={'Dirección'} descripcionPagina={'Confirmar dirección del destino'}>
      <Typography variant="h1" component={'h1'}>Dirección</Typography>

      <form onSubmit={handleSubmit(onRevisarPedido)}>
        <Grid container spacing={2} sx={{ mt: 2 }}>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Nombre'
              variant="filled"
              fullWidth
              {
              ...register('nombre', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })
              }

              error={!!errors.nombre}
              helperText={errors.nombre?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Apellido'
              variant="filled"
              fullWidth
              {
              ...register('apellido', {
                required: 'Este campo es requerido',
                minLength: { value: 2, message: 'Minimo 2 caracteres' }
              })
              }
              error={!!errors.apellido}
              helperText={errors.apellido?.message}
            />

          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección'
              variant="filled"
              fullWidth
              {
              ...register('direccion', {
                required: 'Este campo es requerido'
              })
              }
              error={!!errors.direccion}
              helperText={errors.direccion?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Dirección 2 (Opcional)'
              variant="filled"
              fullWidth
              {
              ...register('direccion2')
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Codigo Postal'
              variant="filled"
              fullWidth
              {
              ...register('codigo', {
                required: 'Este campo es requerido'
              })
              }
              error={!!errors.codigo}
              helperText={errors.codigo?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Cuidad'
              variant="filled"
              fullWidth
              {
              ...register('ciudad', {
                required: 'Este campo es requerido'
              })
              }
              error={!!errors.codigo}
              helperText={errors.codigo?.message}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <NoSsr>
                <TextField
                  key={Cookie.get('pais') || ciudades[0].code}
                  select
                  variant="filled"
                  label="País"
                  defaultValue={Cookie.get('pais') || ciudades[0].code}
                  {
                  ...register('pais', {
                    required: 'Este campo es requerido'
                  })
                  }
                  error={!!errors.pais}
                  helperText={errors.pais?.message}
                >
                  {
                    ciudades.map(pais => (

                      <MenuItem value={pais.code}
                        key={pais.code}
                      >
                        {pais.name}
                      </MenuItem>
                    ))
                  }
                </TextField>
              </NoSsr>

            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label='Teléfono'
              variant="filled"
              fullWidth
              {
              ...register('telefono', {
                required: 'Este campo es requerido'
              })
              }
              error={!!errors.telefono}
              helperText={errors.telefono?.message}
            />
          </Grid>

        </Grid>

        <Box sx={{ mt: 5 }} display={'flex'} justifyContent={'center'}>
          <Button color="secondary" className="circular-btn" size="large" type="submit">
            Revisar Pedido
          </Button>
        </Box>
      </form>

    </TiendaLayout>
  )
}



export default PaginaDireccion