import React, { useEffect, useState } from 'react'


import { AdminLayout } from '@/components/layouts';

import { DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducto } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { wakandaApi } from '@/api';


const tiposValidos  = ['poleras', 'pantalones', 'polerones', 'gorros', 'pantuflas', 'pijamas']
const generosValidos = ['hombre','mujer','niños']
const tallasValidas = ['XS','S','M','L','XL','XXL','XXXL']



const AdminProductos = ({ producto }) => {

    const [newTag, setNewTag] = useState('');
    const [guardando, setGuardando] = useState(false);

   const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm({
        defaultValues: producto
   });

   console.log(  )

   useEffect( () => {

    const subcripcion = watch( ( value, { name, type } ) => {

        if( name === 'titulo' ) {
            const nuevoSlug = value.titulo.trim()
                                          .replaceAll(' ', '-' ) 
                                          .toLocaleLowerCase() || '';

            setValue( 'slug', nuevoSlug )                              
        }
    } )

    return () => subcripcion.unsubscribe();

   },[ watch, setValue ] )

   const onCambiarTalla = ( talla ) => {
        const tallasActuales = getValues('tallas');

        //Eliminando
        if( tallasActuales.includes( talla ) ) {
            setValue( 'tallas', tallasActuales.filter( tallaState => tallaState !== talla   ), { shouldValidate: true } );
            return;
        }
        
        //Agregando
        setValue( 'tallas', [ ...tallasActuales, talla ], { shouldValidate: true } );


   }

   const onAgregarTag = ( ) => {

       const tag = newTag.trim().toLocaleLowerCase();

        setNewTag('');
        const tagsActuales = getValues('tags');

        if( tagsActuales.includes( tag ) ){
            return;
        }

        setValue( 'tags', [ ...tagsActuales, tag ], { shouldValidate: true } );
       
   }

    const onDeleteTag = ( tag  ) => {
        const tagsActualizados = getValues('tags').filter( t => t !== tag );

        setValue( 'tags', tagsActualizados, { shouldValidate: true } );
    }

    const onSubmit = async( form ) => {

        
        if( form.imagenes.length < 2 ) {
            return alert( 'Minimo 2 imagenes' );
        }
        setGuardando( true );
        
        try {
            console.log( form )
            const { data } = await wakandaApi({
                url: '/admin/productos',
                method: 'PUT',
                data: form
            });

            console.log({ data });
            if( !form._id ) {

            }else {
                setGuardando(false);
            }
        } catch (error) {
            console.log( error );
            setGuardando( true );
        }

    }

    return (
        <AdminLayout 
            titulo={'producto'} 
            subTitulo={`Editando: ${ producto.titulo }`}
            icono={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='end' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <SaveOutlined /> }
                        sx={{ width: '150px' }}
                        type="submit"
                        disabled={ guardando }
                        >
                        Guardar
                    </Button>
                </Box>

                <Grid container spacing={2}>
                    {/* Data */}
                    <Grid item xs={12} sm={ 6 }>

                        <TextField
                            label="Título"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('titulo', {
                                required: 'Este campo es requerido',
                                minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                            })}
                            error={ !!errors.titulo }
                            helperText={ errors.titulo?.message }
                        />

                        <TextField
                            label="Descripción"
                            variant="filled"
                            fullWidth 
                            multiline
                            rows={5}
                            sx={{ mb: 1 }}
                            { ...register('descripcion', {
                                required: 'Este campo es requerido',
                            })}
                            error={ !!errors.descripcion }
                            helperText={ errors.descripcion?.message }
                        />

                        <TextField
                            label="Inventario"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('inStock', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo valor 0' }
                            })}
                            error={ !!errors.inStock }
                            helperText={ errors.inStock?.message }
                        />
                        
                        <TextField
                            label="Precio"
                            type='number'
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            { ...register('precio', {
                                required: 'Este campo es requerido',
                                minLength: { value: 0, message: 'Mínimo de valor 0' }
                            })}
                            error={ !!errors.precio }
                            helperText={ errors.precio?.message }
                        />

                        <Divider sx={{ my: 1 }} />

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Tipo</FormLabel>
                            <RadioGroup
                                row
                                value={ getValues('tipo') }
                                onChange={ ( { target } ) => setValue('tipo', target.value, { shouldValidate: true } ) }
                            >
                                {
                                    tiposValidos.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormControl sx={{ mb: 1 }}>
                            <FormLabel>Género</FormLabel>
                            <RadioGroup
                                row
                                
                               
                                value={ getValues('genero') }
                                onChange={ ( { target } ) => setValue('genero', target.value, { shouldValidate: true } ) }
                            >
                                {
                                    generosValidos.map( option => (
                                        <FormControlLabel 
                                            key={ option }
                                            value={ option }
                                            control={ <Radio color='secondary' /> }
                                            label={ capitalize(option) }
                                        />
                                    ))
                                }
                            </RadioGroup>
                        </FormControl>

                        <FormGroup>
                            <FormLabel>Tallas</FormLabel>
                            {
                                tallasValidas.map(talla => (
                                    <FormControlLabel 
                                        key={talla} 
                                        control={<Checkbox checked={ getValues('tallas').includes(talla) } />} 
                                        label={ talla }
                                        onChange={ () => onCambiarTalla( talla ) }
                                    />
                                ))
                            }
                        </FormGroup>

                    </Grid>

                    {/* Tags e imagenes */}
                    <Grid item xs={12} sm={ 6 }>
                        <TextField
                            label="Slug - URL"
                            variant="filled"
                            fullWidth
                            sx={{ mb: 1 }}
                            { ...register('slug', {
                                required: 'Este campo es requerido',
                                validate: ( val ) => val.trim().includes(' ') 
                                ? 'No puede tener espacios en blanco' : undefined 
                            })}
                            error={ !!errors.slug }
                            helperText={ errors.slug?.message }
                        />

                        <TextField
                            label="Etiquetas"
                            variant="filled"
                            fullWidth 
                            sx={{ mb: 1 }}
                            helperText="Presiona [spacebar] para agregar"

                            value={ newTag }
                            onChange={ ({ target }) => setNewTag( target.value ) }
                            onKeyUp={ ({ code }) => code === 'Space' ? onAgregarTag() : undefined  }
                        />  
                        
                        <Box sx={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            listStyle: 'none',
                            p: 0,
                            m: 0,
                        }}
                        component="ul">
                            {
                                getValues('tags').map((tag) => {

                                return (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        onDelete={ () => onDeleteTag(tag)}
                                        color="primary"
                                        size='small'
                                        sx={{ ml: 1, mt: 1}}
                                    />
                                );
                            })}
                        </Box>

                        <Divider sx={{ my: 2  }}/>
                        
                        <Box display='flex' flexDirection="column">
                            <FormLabel sx={{ mb:1}}>Imágenes</FormLabel>
                            <Button
                                color="secondary"
                                fullWidth
                                startIcon={ <UploadOutlined /> }
                                sx={{ mb: 3 }}
                            >
                                Cargar imagen
                            </Button>

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                            />

                            <Grid container spacing={2}>
                                {
                                    producto.imagenes.map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ `/productos/${ img }` }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button fullWidth color="error">
                                                        Borrar
                                                    </Button>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                }
                            </Grid>

                        </Box>

                    </Grid>

                </Grid>
            </form>
        </AdminLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time


export const getServerSideProps = async ({ query }) => {
    
    const { slug = ''} = query;
    
    const producto = await dbProducto.obtenerProductoPorSlug(slug.toString());

    if ( !producto ) {
        return {
            redirect: {
                destination: '/admin/productos',
                permanent: false,
            }
        }
    }
    

    return {
        props: {
          producto
        }
    }
}


export default AdminProductos

