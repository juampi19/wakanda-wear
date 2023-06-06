import { useEffect, useState } from 'react'
import useSWR from "swr"

import { AdminLayout } from '@/components/layouts'
import { PeopleOutline } from '@mui/icons-material'
import { Grid, MenuItem, Select } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { PaginaCargando } from '@/components/ui'
import { wakandaApi } from '@/api';


const PaginaUsuarios = () => {

    const { data, error } = useSWR( '/api/admin/usuarios' );
    const [usuarios, setUsuarios] = useState([]);


    useEffect( () => {

        if( data ) {
            setUsuarios( data );
        }

    }, [ data ] )


    if( !error && !data  ) {
        return <PaginaCargando />
    }

    const onCambiarRol = async( usuarioId, nuevoRol ) => {

        const usuariosAnteriores = usuarios.map( usuario => ({...usuario }) );

        const usuariosActualizados = usuarios.map( usuario => ({
            ...usuario,
            rol: usuarioId === usuario._id ? nuevoRol : usuario.rol
        }) );

        setUsuarios( usuariosActualizados );

        try {
            await wakandaApi.put('/admin/usuarios', {
                usuarioId,
                rol: nuevoRol
            })
        } catch (error) {
            setUsuarios( usuariosAnteriores );
           alert( 'No se pudo actualizar el rol del usuario' )
        }


    }

    const columns = [
        { field: 'email', headerName: 'Correo', width: 250 },
        { field: 'nombre', headerName: 'Nombre', width: 350 },
        { 
            field: 'rol', 
            headerName: 'Rol',
            width: 300,
            renderCell: ( params ) => {
                return (
                    <Select
                        value={params.row.rol}
                        label="rol"
                        sx={{ width: '300px' }}
                        onChange={ ({ target }) => onCambiarRol( params.row.id, target.value ) }
                    >
                        <MenuItem value='admin'>
                            Admin
                        </MenuItem>
                        <MenuItem value='super-user'>
                            Super User
                        </MenuItem>
                        <MenuItem value='SEO'>
                            SEO
                        </MenuItem>
                        <MenuItem value='cliente'>
                            Cliente
                        </MenuItem>
                        <MenuItem value='repartidor'>
                            Repartidor
                        </MenuItem>
                    </Select>
                )
            }
        },
    ]

    const rows = usuarios?.map( usuario => ({
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
    }) )

    return (
        <AdminLayout
            titulo={'Usuarios - Wakanda Wear'}
            subTitulo={'Administrador usuarios'}
            icono={<PeopleOutline />}
        >

            <Grid container className="fadeIn">
                <Grid item xs={12} sx={{ height: 650, width: '100%' }}>

                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: { pageSize: 5 }
                            }
                        }}
                        pageSizeOptions={[5, 10, 25]}
                    />

                </Grid>
            </Grid>


        </AdminLayout>
    )
}

export default PaginaUsuarios