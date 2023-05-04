import { UIContext } from "@/context";
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, Inventory2Outlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";





export const SideMenu = () => {


    const router = useRouter();
    const { isMenuOpen, mostrarSlideMenu } = useContext(UIContext);
    const [search, setSearch] = useState('');


    //Funcion para navegar al producto buscado
    const onBuscarProdcuto = () => {
        if( search.trim().length === 0 ) return ;

        navegarSeccion(`/search/${ search }`);
    }


    const navegarSeccion = (url) => {
        mostrarSlideMenu();

        router.push( url );
    }




    return (
        <Drawer
            open={isMenuOpen}
            onClose={mostrarSlideMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>

                <List>

                    <ListItem>
                        <Input
                            autoFocus
                            value={ search }
                            onChange={ e => setSearch( e.target.value ) }
                            onKeyPress={ (e) => e.key === 'Enter' ? onBuscarProdcuto() : null }
                            type='text'
                            placeholder="Buscar..."
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                       onClick={onBuscarProdcuto}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AccountCircleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Perfil'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItem>


                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={ () => navegarSeccion('/categoria/hombres') }
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Wakanda Men'} />
                    </ListItem>



                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={ () => navegarSeccion( '/categoria/mujeres' ) }
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Wakanda Women'} />
                    </ListItem>




                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={ () => navegarSeccion( '/categoria/ninos' ) }
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Wakanda Kids'} />
                    </ListItem>




                    <ListItem button>
                        <ListItemIcon>
                            <VpnKeyOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <LoginOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Salir'} />
                    </ListItem>


                    {/* Admin */}
                    <Divider />
                    <ListSubheader>Admin Panel</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <CategoryOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Productos'} />
                    </ListItem>
                    <ListItem button>
                        <ListItemIcon>
                            <ConfirmationNumberOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Ordenes'} />
                    </ListItem>

                    <ListItem button>
                        <ListItemIcon>
                            <AdminPanelSettings />
                        </ListItemIcon>
                        <ListItemText primary={'Usuarios'} />
                    </ListItem>

                    {/*Repartidor */}
                    <Divider />
                    <ListSubheader>Repartidor</ListSubheader>

                    <ListItem button>
                        <ListItemIcon>
                            <Inventory2Outlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mis Ordenes'} />
                    </ListItem>
                </List>
            </Box>
        </Drawer>
    )
}
