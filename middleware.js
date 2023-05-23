import * as jose from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware( req ){

    // const previousPage = req.nextUrl.pathname;

    // if (previousPage.startsWith('/checkout')) {
    //     const token = req.cookies.get('token')?.value || '';
     
    //     try {
    //       await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET_SEED));
    //       return NextResponse.next();
    //     } catch (error) {
    //       return NextResponse.redirect(
    //         new URL(`/auth/login?p=${previousPage}`, req.url)
    //       );
    //     }
    //   }

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    if( !session ) {
      const requestedPage = req.nextUrl.pathname;
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${ requestedPage }`;

      return NextResponse.redirect( url );
    }

    // return NextResponse.redirect( new URL(), req.url )
    return NextResponse.next();

}

export const config = {
    matcher: [
      '/checkout/:path*'
    ],
  };