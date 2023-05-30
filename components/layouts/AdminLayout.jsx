
import { SideMenu } from '../ui'
import { AdminNavbar } from '../admin'
import { Box, Typography } from '@mui/material'


export const AdminLayout = ({ children, titulo, subTitulo, icono }) => {
  return (
    <>
        
      {/** Navbar */}
      <nav>
        <AdminNavbar />
      </nav>

      {/*TODO: sidebar */}
      <SideMenu />


      <main style={{
        margin: '80px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>

        <Box display={'flex'} flexDirection={'column'}>

          <Typography variant='h1' component={'h1'}>
            {icono}
            { titulo }
          </Typography>

          <Typography variant='h2' sx={{ mb: 2, mt: 2 }}>
            {subTitulo}
          </Typography>

        </Box>

        <Box className={ 'fadeIn' }>

          { children }
        </Box>

      </main>

    </>
  )
}
