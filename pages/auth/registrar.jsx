import { AuthLayout } from "@/components/layouts"
import { Box, Button, Grid, Link, TextField, Typography } from "@mui/material"
import NextLink from 'next/link';

const PaginaRegistro = () => {
  return (
    <AuthLayout titulo={'Crear Cuenta'}>
      <Box sx={{ width: 350, padding: '10px 20px' }}>
        
        <Grid container spacing={2}>

          <Grid item xs={12}> 
            <Typography variant="h1" component={'h1'} textAlign={'center'}>
              Crear cuenta
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Nombre" variant="filled" fullWidth type="text"/>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth type="email"/>
          </Grid>
          
          <Grid item xs={12}>
            <TextField label="Password" type="password" variant="filled" fullWidth/>
          </Grid>
          
          <Grid item xs={12}>
            <Button fullWidth size="large" color="secondary" className="circular-btn">
              Registrar
            </Button>
          </Grid>

          <Grid item xs={12} display={'flex'} justifyContent={'end'}>
            <NextLink href={'/auth/login'} passHref legacyBehavior>
              <Link>
                ¿Ya tienes una cuenta?
              </Link>
            </NextLink>
          </Grid>

        </Grid>

      </Box>
    </AuthLayout>
  )
}

export default PaginaRegistro