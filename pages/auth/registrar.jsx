import { wakandaApi } from "@/api";
import { AuthLayout } from "@/components/layouts"
import { AuthContext } from "@/context";
import { validacion } from "@/utils";
import { ErrorOutline } from "@mui/icons-material";
import { Box, Button, Chip, Grid, Link, TextField, Typography } from "@mui/material"
import NextLink from 'next/link';
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

const PaginaRegistro = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensajeError, setMensajeError] = useState('');

  const { usuarioRegistro } = useContext( AuthContext );

  const router = useRouter();


  const onRegisterUser = async( data ) => {
    const { email, nombre, password } = data;

    setMostrarMensaje( false );

    const { hasError, message } = await usuarioRegistro( nombre, email, password );

    if( hasError ){
      setMostrarMensaje(true);
      setMensajeError( message );
      
      setTimeout(() => {
        setMostrarMensaje(false)
      }, 3000);
    }

    const destinacion = router.query.p?.toString() || '/';
    router.replace( destinacion );
  }

  return (
    <AuthLayout titulo={'Crear Cuenta'}>
      <Box sx={{ width: 350, padding: '10px 20px' }}>

        <form onSubmit={ handleSubmit( onRegisterUser ) }>
        
          <Grid container spacing={2}>

            <Grid item xs={12}> 
              <Typography variant="h1" component={'h1'} textAlign={'center'}>
                Crear cuenta
              </Typography>
              <Chip 
                label={ mensajeError }
                color="error"
                icon={ <ErrorOutline /> }
                className="fadeIn"
                sx={{ justifyContent: 'center', display: mostrarMensaje ? 'flex' : 'none' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Nombre" variant="filled" fullWidth type="text"
                {
                  ...register( 'nombre' ,{
                    required: 'Este campo es requerido',
                    minLength: { value: 2, message: 'Minimo 2 caracteres' }
                  })
                }

                error={ !!errors.nombre }
                helperText={ errors.nombre?.message }
              />
            </Grid>

            <Grid item xs={12}>
              <TextField label="Correo" variant="filled" fullWidth type="email"
                {
                  ...register( 'email',{
                    required: 'Este campo es requerido',
                    validate: validacion.isEmail
                  } )
                }

                error={ !!errors.email }
                helperText={ errors.email?.message } 
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField label="Password" type="password" variant="filled" fullWidth
                {
                  ...register( 'password', {
                    required: 'Este campo es requerido',
                    minLength: { value: 6, message: 'Minimo 6 caracteres' }
                  } )
                }

                error={ !!errors.password }
                helperText={ errors.password?.message }
              />
            </Grid>
            
            <Grid item xs={12}>
              <Button fullWidth size="large" color="secondary" className="circular-btn" type="submit">
                Registrar
              </Button>
            </Grid>

            <Grid item xs={12} display={'flex'} justifyContent={'end'}>
              <NextLink href={ router.query.p ? `/auth/login?p=${router.query.p}`: '/auth/login'} passHref legacyBehavior>
                <Link>
                  ¿Ya tienes una cuenta?
                </Link>
              </NextLink>
            </Grid>

          </Grid>
        </form>
      </Box>
    </AuthLayout>
  )
}

export default PaginaRegistro