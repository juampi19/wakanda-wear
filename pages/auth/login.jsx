import { AuthLayout } from "@/components/layouts";
import { Box, Button, Grid, TextField, Typography, Link } from "@mui/material";
import NextLink from 'next/link'

const PaginaLogin = () => {
  return (
    <AuthLayout titulo={'Ingresar'}>
      <Box sx={{ width: 350, padding: '10px 20px' }}>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h1" component={'h1'} textAlign={'center'}>
              Iniciar Sesión
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Correo" variant="filled" fullWidth type="email"/>
          </Grid>

          <Grid item xs={12}>
            <TextField label="Password" variant="filled" fullWidth type="password"/>
          </Grid>

          <Grid item xs={12}>
            <Button color="secondary" fullWidth size="large" className="circular-btn"> 
              Ingresar
            </Button>
          </Grid>
          <Grid item xs={12} display={'flex'} justifyContent={'end'}>
            <NextLink href={'/auth/registrar'} passHref legacyBehavior>
              <Link underline="always">
                ¿No tienes cuenta?
              </Link>
            </NextLink>
          </Grid>
        </Grid>

      </Box>
    </AuthLayout>
  )
}

export default PaginaLogin