import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import Credenciales from "next-auth/providers/credentials";
import { dbUsuarios } from "@/database";


export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    
    // ...add more providers here
    Credenciales({
      name:'Custom login',
      credentials: {
        email: { label: 'Correo:', type: 'email', placeholder: 'Tu correo' },
        password: { label: 'Contraseña:', type: 'password', placeholder: 'Tu contraseña'  }
      },
      async authorize( credentials ) {

        console.log( credentials );
        
        return await dbUsuarios.confirmarEmailPassword( credentials.email, credentials.password );
      }
    }),

    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],

  //paginas custom
  pages:{
    signIn: '/auth/login',
    newUser: '/auth/registrar'
  },

  session: {
    maxAge: 2592000,//30d
    strategy: 'jwt',
    updateAge: 86400//cada dia
  },

  //callbacks

  callbacks: {
    async jwt({  token, account, user }){

      if( account ) {
        token.accessToken = account.access_token;

        switch( account.type ){
          case 'oauth':
            token.user = await dbUsuarios.OAuthUsuario( user.email, user.name );
          break;

          case 'credentials':
            token.user = user
          break;
        }
      }

      return token;
    },

    async session({ session, token, user }){
      
      session.accessToken = token.accessToken;
      session.user = token.user;

      return session;
    }
  }

}
export default NextAuth(authOptions)