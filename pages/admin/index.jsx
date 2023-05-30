import React, { useEffect, useState } from 'react'
import useSWR from "swr"

import { AccessTimeOutlined, AttachMoneyOutlined, CancelPresentationOutlined, CategoryOutlined, CreditCardOffOutlined, CreditCardOutlined, DashboardOutlined, GroupOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material'
import { Card, Grid, Typography } from '@mui/material'

import { DatosTienda } from '@/components/admin'
import { AdminLayout } from '@/components/layouts'
import { PaginaCargando } from '@/components/ui'

const PaginaDashboard = () => {


  const { data, error } = useSWR( '/api/admin/dashboard',{
    refreshInterval: 30 * 1000
  } );


  const [recarga, setRecarga] = useState(30);


  useEffect(() => {
    const intervalo = setInterval( () => {
      setRecarga( recarga => recarga > 0 ? recarga - 1 : 30 )
    }, 1000 )
  
    return () => clearInterval( intervalo );

  }, [])

  if( !error && !data  ) {
    return <PaginaCargando />
  }


  if( error ){
    console.log( error );
    return <Typography>Error al cargar la información</Typography>
  }


  const {
        numeroDeOrdenes,
        ordenesPagadas,
        ordenesPendientes,
        totalClientes,
        totalProductos,
        sinStock,
        bajoInventario
  } = data;



  return (

    <AdminLayout
      titulo={'Dashboard - Wakanda wear'}
      subTitulo={'Estadisticas de la tienda'}
      icono={<DashboardOutlined />}
    >
      <Grid container spacing={2}>

        <DatosTienda
          titulo={ numeroDeOrdenes }
          subtitulo={'Ordenes totales'}
          icono={<CreditCardOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ ordenesPagadas }
          subtitulo={'Ordenes pagadas'}
          icono={<AttachMoneyOutlined color='success' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ ordenesPendientes }
          subtitulo={'Ordenes pendientes'}
          icono={<CreditCardOffOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ totalClientes }
          subtitulo={'Clientes'}
          icono={<GroupOutlined color='primary' sx={{ fontSize: 40 }} />}
        />


        <DatosTienda
          titulo={ totalProductos }
          subtitulo={'Productos'}
          icono={<CategoryOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ sinStock }
          subtitulo={'Sin stock'}
          icono={<CancelPresentationOutlined color='error' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ bajoInventario }
          subtitulo={'Bajo inventario'}
          icono={<ProductionQuantityLimitsOutlined color='warning' sx={{ fontSize: 40 }} />}
        />

        <DatosTienda
          titulo={ recarga }
          subtitulo={'Actualizacion en:'}
          icono={<AccessTimeOutlined color='secondary' sx={{ fontSize: 40 }} />}
        />


      </Grid>
    </AdminLayout>

  )
}

export default PaginaDashboard;
