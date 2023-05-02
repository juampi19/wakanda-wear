import { UIContext } from '@/context'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'

export const NavBar = () => {

  const {asPath, push} = useRouter();
  const [search, setSearch] = useState('');
  const [isBuscando, setIsBuscando] = useState(false);


  //Funcion para navegar al producto buscado
  const onBuscarProdcuto = () => {
      if( search.trim().length === 0 ) return ;

      push( `/search/${ search }` );
  }


  


  
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

        <Box sx={{ display: isBuscando ? 'none' : { xs: 'none', md: 'block' } }} className="fadeIn">
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

        {/**Pantallas grandes */}
        
        {
          isBuscando 
            ? (
              <Input
                  sx={{ display: { xs: 'none', sm: 'flex' } }}
                  className='fadeIn'
                  autoFocus
                  value={ search }
                  onChange={ e => setSearch( e.target.value ) }
                  onKeyPress={ (e) => e.key === 'Enter' ? onBuscarProdcuto() : null }
                  type='text'
                  placeholder="Buscar..."
                  endAdornment={
                      <InputAdornment position="end">
                          <IconButton
                              onClick={() => setIsBuscando(false)}
                          >
                              <ClearOutlined />
                          </IconButton>
                      </InputAdornment>
                  }
              />
            )
          : (
            <IconButton
              onClick={ () => setIsBuscando(true) }
              className='fadeIn'
              sx={{ display: { xs: 'none', sm: 'flex' } }}
            >
              <SearchOutlined />
            </IconButton>
          )
        }
        

        {/**Pantalla pequeña */}
        <IconButton
          sx={{ display: { xs: 'flex', sm: 'none' } }}
          onClick={ mostrarSlideMenu }
        >
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
