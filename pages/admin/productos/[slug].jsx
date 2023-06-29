import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2'


import { AdminLayout } from '@/components/layouts';

import { ArrowBackOutlined, DriveFileRenameOutline, SaveOutlined, UploadOutlined } from '@mui/icons-material';
import { dbProducto } from '../../../database';
import { Box, Button, capitalize, Card, CardActions, CardMedia, Checkbox, Chip, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, ListItem, Paper, Radio, RadioGroup, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { wakandaApi } from '@/api';
import { Producto } from '@/models';


const tiposValidos  = ['poleras', 'pantalones', 'polerones', 'gorros', 'pantuflas', 'pijamas']
const generosValidos = ['hombre','mujer','niños']
const tallasValidas = ['XS','S','M','L','XL','XXL','XXXL']



const AdminProductos = ({ producto }) => {

    const fileInputRef = useRef(null)
    const [newTag, setNewTag] = useState('');
    const [guardando, setGuardando] = useState(false);
    const router = useRouter();

   const { register, handleSubmit, formState:{ errors }, getValues, setValue, watch } = useForm({
        defaultValues: producto
   });


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


   //Cambiar las tallas del producto
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

   //Agregar un nuevo tag
   const onAgregarTag = ( ) => {

       const tag = newTag.trim().toLocaleLowerCase();

        setNewTag('');
        const tagsActuales = getValues('tags');

        if( tagsActuales.includes( tag ) ){
            return;
        }

        setValue( 'tags', [ ...tagsActuales, tag ], { shouldValidate: true } );
       
   }

   //Borrar los tag del producto
    const onDeleteTag = ( tag  ) => {
        const tagsActualizados = getValues('tags').filter( t => t !== tag );

        setValue( 'tags', tagsActualizados, { shouldValidate: true } );
    }


    //Seleccionar una imagen 
    const archivosSeleccionados = async ({ target }) => {
        //No se selecciono imagenes
        if( !target.files || target.files.length === 0) {
            return
        }

        
        try {

            for( const file of target.files ){

                const formData = new FormData();
                formData.append( 'file', file );

                const { data } = await wakandaApi.post( '/admin/subidaArchivo', formData );

                console.log( data.message );
                setValue( 'imagenes', [...getValues('imagenes'), data.message ], {
                    shouldValidate: true
                } )
            }
            
        } catch (error) {
            console.log(error)
        }

    }

    const onBorrarImagen = ( imagen ) => {
        setValue( 'imagenes', getValues('imagenes').filter( img => img !== imagen ), { shouldValidate: true } )
    }

    const onSubmit = async( form ) => {

    
        
        if( form.imagenes.length < 2 ) {
            return alert( 'Minimo 2 imagenes' );
        }
        setGuardando( true );
        
        try {
            
            const { data } = await wakandaApi({
                method: form._id ? 'PUT' : 'POST',
                url: '/admin/productos',
                data: form
            })

            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `${ form._id ? 'Producto Editando Correctamente': 'Producto Creado Correctamente' }`,
                showConfirmButton: false,
                timer: 1500
              })

            if( !form._id ) {
                router.replace(`/admin/productos/${ form.slug }`);
                
            }else {
                setGuardando(false);
            }
        } catch (error) {
            console.log( error );
            setGuardando( false );
        }

    }

    return (
        <AdminLayout 
            titulo={'producto'} 
            subTitulo={ producto._id ? `Editando: ${ producto.titulo }` : 'Creando producto'}
            icono={ <DriveFileRenameOutline /> }
        >
            <form onSubmit={ handleSubmit( onSubmit ) }>
                <Box display='flex' justifyContent='space-between' sx={{ mb: 1 }}>
                    <Button 
                        color="secondary"
                        startIcon={ <ArrowBackOutlined /> }
                        sx={{ width: '150px' }}
                        onClick={ () => router.push('/admin/productos') }
                        >
                        Regresar
                    </Button>

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
                                onClick={ () => fileInputRef.current?.click() }
                            >
                                Cargar imagen
                            </Button>

                            <input 
                                type='file'
                                multiple
                                accept='image/png, image.gif, image/jpeg'
                                style={{ display: 'none' }}
                                ref={ fileInputRef }
                                onChange={ archivosSeleccionados }
                            />

                            <Chip 
                                label="Es necesario al 2 imagenes"
                                color='error'
                                variant='outlined'
                                sx={{ display: getValues('imagenes').length < 2 ?' flex' : 'none', mb: 2 } }
                            />

                            <Grid container spacing={2}>
                                {
                                    getValues('imagenes').map( img => (
                                        <Grid item xs={4} sm={3} key={img}>
                                            <Card>
                                                <CardMedia 
                                                    component='img'
                                                    className='fadeIn'
                                                    image={ img }
                                                    alt={ img }
                                                />
                                                <CardActions>
                                                    <Button 
                                                        fullWidth 
                                                        color="error"
                                                        onClick={ () => onBorrarImagen( img ) }
                                                    >
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

    let producto;

    if( slug === 'nuevo' ) {
        //Creando un producto
        const productoTemp = JSON.parse( JSON.stringify( new Producto() ) );
        delete productoTemp._id;
        productoTemp.imagenes = [];
        producto = productoTemp

    }else{
        //Editando un producto
        producto = await dbProducto.obtenerProductoPorSlug(slug.toString());
    }
    

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

