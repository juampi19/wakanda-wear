import {  useEffect, useState } from "react";
import { getSession, signIn, getProviders } from "next-auth/react";
import NextLink from 'next/link'

import { useForm } from "react-hook-form";

import { AuthLayout } from "@/components/layouts";

import { validacion } from "@/utils";

import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography, Link, Chip, Divider } from "@mui/material";
import { useRouter } from "next/router";



const PaginaLogin = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mostrarError, setMostrarError] = useState(false);
  const [providers, setProviders] = useState({});

  const router = useRouter();

  useEffect( () => {
    getProviders().then( prov => {
      setProviders(prov)
    } )
  }, [] )



  const onLoginUser = async (data) => {
    const { email, password } = data;

    setMostrarError(false);

    await signIn( 'credentials', { email, password } )
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

            <Grid item xs={12} display={'flex'} justifyContent={'space-between'}>
            <NextLink href={router.query.p ? `/?p=${router.query.p}`: '/'} passHref legacyBehavior>
                <Link underline="always">
                  Regresar
                </Link>
              </NextLink>
              <NextLink href={router.query.p ? `/auth/registrar?p=${router.query.p}`: '/auth/registrar'} passHref legacyBehavior>
                <Link underline="always">
                  ¿No tienes cuenta?
                </Link>
              </NextLink>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'center'} flexDirection={'column'}>
              <Divider sx={{ width: '100%', mb: 2 }}/>
                {
                  Object.values( providers ).map( ( provider ) => {

                    if( provider.id === 'credentials' ) return ( <div key={'credentials'}></div> )

                    return (
                      <Button
                        key={provider.id}
                        fullWidth
                        color="primary"
                        sx={{ mb: 1 }}
                        onClick={ () => signIn( provider.id ) }
                      >
                        { provider.name }
                      </Button>
                    )
                  } )
                }
            </Grid>
          </Grid>

        </Box>
      </form>
    </AuthLayout>
  )
}


export const getServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/' } = query

  if( session ){
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }

  return {
    props: {

    }
  }
}

export default PaginaLogin