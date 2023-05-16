

export const authReducer = ( state, action ) => {

    switch( action.type ) {
        case '[Auth] - Login':
            return {
                ...state,
                usuarioConectado: true,
                usuario: action.payload
            }

        case '[Auth] - Logout':
            return {
                ...state,
                usuarioConectado: false,
                usuario: {}
            }    
        default: 
            return state;    
    }
}