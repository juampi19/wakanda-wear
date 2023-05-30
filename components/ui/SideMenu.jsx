import { AuthContext, UIContext } from "@/context";
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardOutlined, EscalatorWarningOutlined, FemaleOutlined, Inventory2Outlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { Box, Divider, Drawer, IconButton, Input, InputAdornment, Link, List, ListItem, ListItemIcon, ListItemText, ListSubheader } from "@mui/material";
import { useContext, useState } from "react";
import { useRouter } from "next/router";





export const SideMenu = () => {


    const router = useRouter();
    const { isMenuOpen, mostrarSlideMenu } = useContext(UIContext);
    const { usuario, usuarioConectado, usuarioLogout } = useContext(AuthContext);
    const [search, setSearch] = useState('');


    //Funcion para navegar al producto buscado
    const onBuscarProdcuto = () => {
        if (search.trim().length === 0) return;

        navegarSeccion(`/search/${search}`);
    }


    const navegarSeccion = (url) => {
        mostrarSlideMenu();

        router.push(url);
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
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' ? onBuscarProdcuto() : null}
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

                    {
                        usuarioConectado && (
                            <>
                                <ListItem button>
                                    <ListItemIcon>
                                        <AccountCircleOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Perfil'} />
                                </ListItem>

                                <ListItem button onClick={ () => navegarSeccion('/ordenes/historial') }>
                                    <ListItemIcon>
                                        <ConfirmationNumberOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }




                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navegarSeccion('/categoria/hombres')}
                    >
                        <ListItemIcon>
                            <MaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Hombres'} />
                    </ListItem>



                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navegarSeccion('/categoria/mujeres')}
                    >
                        <ListItemIcon>
                            <FemaleOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'Mujeres'} />
                    </ListItem>




                    <ListItem button sx={{ display: { xs: '', sm: 'none' } }}
                        onClick={() => navegarSeccion('/categoria/ninos')}
                    >
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                        </ListItemIcon>
                        <ListItemText primary={'niños'} />
                    </ListItem>



                    {
                        usuarioConectado ? (
                            <ListItem button
                                onClick={ usuarioLogout }
                            >
                                <ListItemIcon>
                                    <LoginOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Salir'} />
                            </ListItem>
                        ) : (
                            <ListItem button
                                onClick={ () => navegarSeccion(`/auth/login?p=${ router.asPath }`) }
                            >
                                <ListItemIcon>
                                    <VpnKeyOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ingresar'} />
                            </ListItem>
                        )
                    }





                    {/* Admin */}
                    {
                        usuario.rol === 'admin' && usuarioConectado && (
                            <>
                                <Divider />
                                <ListSubheader>Admin Panel</ListSubheader>

                                <ListItem button
                                    onClick={ () => navegarSeccion(`/admin`) }
                                >
                                    <ListItemIcon>
                                        <DashboardOutlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Dashboard'} />
                                </ListItem>

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
                            </>
                        )
                    }


                    {/*Repartidor */}
                    {
                        usuario.rol === 'repartidor' && usuarioConectado && (
                            <>
                                <Divider />
                                <ListSubheader>Repartidor</ListSubheader>

                                <ListItem button>
                                    <ListItemIcon>
                                        <Inventory2Outlined />
                                    </ListItemIcon>
                                    <ListItemText primary={'Mis Ordenes'} />
                                </ListItem>
                            </>
                        )
                    }

                </List>
            </Box>
        </Drawer>
    )
}
