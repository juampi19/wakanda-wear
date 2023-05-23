import { useSession, signOut } from 'next-auth/react';
import { useEffect, useReducer } from 'react'
import { AuthContext, authReducer } from './'
import { wakandaApi } from '@/api';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useRouter } from 'next/router';

const AUTH_INITIAL_STATE = {
    usuarioConectado: false,
    usuario: {}
}
export const AuthProvider = ({ children }) => {

    const [ state, dispatch ] = useReducer( authReducer, AUTH_INITIAL_STATE );
    const { data, status } = useSession();
    const router = useRouter();


    useEffect( () => {
        if( status === 'authenticated' ){
            console.log( { data } )

            dispatch({ type: '[Auth] - Login', payload: data.user });
        }
    }, [ status, data ] )

    //comprobar si hay un usuario registrado
    // useEffect( () => {

    //     verificarToken();

    // }, [] );


    // const verificarToken = async () => {

    //     if( !Cookies.get('token') ) return;

    //     try {
            
    //         const { data } = await wakandaApi.get( '/user/validacion-jwt' );

    //         const { token, usuario } = data;

    //         Cookies.set( 'token', token );

    //         dispatch({ type: '[Auth] - Login', payload: usuario });

    //     } catch (error) {
    //         Cookies.remove('token');
    //     }

    // }


    const usuarioLogin = async( email, password ) => {
        

        try {
            
            const { data } = await wakandaApi.post('/user/login', { email, password });

            const { token, usuario } = data;

            Cookies.set( 'token', token );

            dispatch({ type: '[Auth] - Login', payload: usuario });

            return true

        } catch (error) {
            return false;
        }

    }


    const usuarioRegistro = async ( nombre, email, password ) => {

        try {
            
            const { data } = await wakandaApi.post( '/user/registro', { nombre, email, password } );
            const { token, usuario } = data;

            Cookies.set( 'token', token );
            
            dispatch( { type: '[Auth] - Login', payload: usuario  } );

            return {
                hasError: false
            }

        } catch (error) {
            if( axios.isAxiosError( error ) ){
                return {
                    hasError: true,
                    message: error.response?.data.message
                }
            }

            return {
                hasError: true,
                message: 'No se puedo crear el usuario'
            }
        }

    }

    const usuarioLogout = () => {
        
        Cookies.remove('carrito');
        Cookies.remove('nombre')
        Cookies.remove('apellido')
        Cookies.remove('direccion')
        Cookies.remove('direccion2')
        Cookies.remove('codigo')
        Cookies.remove('ciudad')
        Cookies.remove('pais')
        Cookies.remove('telefono')

        signOut();
        
    }



    return (
        <AuthContext.Provider
            value={{
                ...state,
                //Metodos
                usuarioLogin,
                usuarioRegistro,
                usuarioLogout
            }}
        >
            { children }
        </AuthContext.Provider>
    )

}