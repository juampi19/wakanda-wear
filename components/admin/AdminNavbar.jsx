import { useContext } from 'react'

import { AppBar,  Box, Button, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { UIContext } from '@/context'

export const AdminNavbar = () => {
  
  const {isMenuOpen, mostrarSlideMenu} = useContext( UIContext );


  return (
    <AppBar >

      <Toolbar>
        <NextLink href={'/'} passHref legacyBehavior>
          <Link display={'flex'} alignItems={'center'}>
            <Typography variant='h6'>Wakanda |</Typography>
            <Typography sx={{ml: 0.5}}>Wear</Typography>
          </Link>
        </NextLink>

        {/*flex */}
        <Box flex={'1'}/>


        {/**Pantallas grandes */}

          <Button onClick={ mostrarSlideMenu }>
            Menu
          </Button>
      </Toolbar>

    </AppBar>
  )
}
