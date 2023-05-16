import { useContext, useState } from "react";
import { AuthContext } from "@/context";

import { AuthLayout } from "@/components/layouts";

import { wakandaApi } from "@/api";
import { validacion } from "@/utils";

import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography, Link, Chip } from "@mui/material";

import NextLink from 'next/link'
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

const PaginaLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mostrarError, setMostrarError] = useState(false);

  const { usuarioLogin } = useContext(AuthContext);
  const router = useRouter();

  const onLoginUser = async (data) => {
    const { email, password } = data;

    setMostrarError(false);

    const loginCorrecto = await usuarioLogin(email, password);
    

    if (!loginCorrecto) {
      setMostrarError(true)

      setTimeout(() => {
        setMostrarError(false)
      }, 3000);

      return
    }
   

    //Todo: Redireccionar a la pantalla donde el usuario estaba
    const destinacion = router.query.p?.toString() || '/';
    router.replace( destinacion );
  }

  return (
    <AuthLayout titulo={'Ingresar'}>

      <form onSubmit={handleSubmit(onLoginUser)}>
        <Box sx={{ width: 350, padding: '10px 20px' }}>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h1" component={'h1'} textAlign={'center'}>
                Iniciar Sesión
              </Typography>
              <Chip
                label="Email / Contraseñas no encontradas"
                color="error"
                icon={<ErrorOutline />}
                className="fadeIn"
                sx={{ justifyContent: 'center', display: mostrarError ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Correo"
                variant="filled"
                fullWidth
                type="email"
                {
                ...register('email', {
                  required: 'Este campo es requerido',
                  validate: validacion.isEmail
                })
                }
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Password"
                variant="filled"
                fullWidth
                type="password"
                {
                ...register('password', {
                  required: 'Este campo es requerido',
                  minLength: { value: 6, message: 'Minimo 6 caracteres' }
                })
                }
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" color="secondary" fullWidth size="large" className="circular-btn" >
                Ingresar
              </Button>
            </Grid>
            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink href={router.query.p ? `/auth/registrar?p=${router.query.p}`: '/auth/registrar'} passHref legacyBehavior>
                <Link underline="always">
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>
          </Grid>

        </Box>
      </form>
    </AuthLayout>
  )
}

export default PaginaLogin