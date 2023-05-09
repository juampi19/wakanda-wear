import Head from 'next/head'
import { NavBar, SideMenu } from '../ui'
import { Destacados } from '../destacados/Destacados'
import { banners } from '@/database/destacados';


const imagenes = banners.imagenes;

export const TiendaLayout = ({ children, titulo, descripcionPagina, fullUrlImagen, banner  }) => {
  return (
    <>
      <Head>
        <title>{ titulo }</title>

        <meta name='description' content={descripcionPagina}/>
        <meta name='og:title' content={titulo}/>
        <meta name='og:description' content={descripcionPagina}/>

        {
          fullUrlImagen && (
            <meta name='og:image' content={fullUrlImagen}/>
          )
        }
      </Head>

      {/** Navbar */}
      <nav>
        <NavBar />
      </nav>

      {/*TODO: sidebar */}
      <SideMenu />

      {/*banners */}
      { banner && <Destacados
        imagenes={imagenes}
      /> }

      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        { children }
      </main>

      {/*footer */}
      <footer>
        {/*TODO: custom footer */}
      </footer>
    </>
  )
}
