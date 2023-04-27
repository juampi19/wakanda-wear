import { UIContext } from '@/context'
import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'

export const NavBar = () => {


  const {asPath} = useRouter();
  
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

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <NextLink href={'/categoria/hombres'} passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/categoria/hombres' ? 'primary' : 'white' }>
                Wakanda Men
              </Button>
            </Link>
          </NextLink>

          <NextLink href={'/categoria/mujeres'} passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/categoria/mujeres' ? 'primary' : 'white' }>
                Wakanda Women
              </Button>
            </Link>
          </NextLink>

          <NextLink href={'/categoria/ninos'} passHref legacyBehavior>
            <Link>
              <Button color={ asPath === '/categoria/ninos' ? 'primary' : 'white' }>
                Wakanda Kids
              </Button>
            </Link>
          </NextLink>
        </Box>

        {/*flex */}
        <Box flex={'1'}/>

        <IconButton>
          <SearchOutlined />
        </IconButton>

        <NextLink href={'/carrito'} passHref legacyBehavior>
            <Link>
              <IconButton>
                <Badge badgeContent={2} color='secondary'>
                  <ShoppingCartOutlined />
                </Badge>
              </IconButton>
            </Link>
          </NextLink>

          <Button onClick={ mostrarSlideMenu }>
            Menu
          </Button>
      </Toolbar>
    </AppBar>
  )
}
