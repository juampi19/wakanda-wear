import * as jose from 'jose';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function middleware( req ){

    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

    const validRoles = ['admin', 'super-user', 'SEO'];
    const requestedPage = req.nextUrl.pathname;

    if( !session ) {
      const url = req.nextUrl.clone();
      url.pathname = `/auth/login`;
      url.search = `p=${ requestedPage }`;

      if(requestedPage.startsWith("/api/admin"))
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

      return NextResponse.redirect( url );
    }

    if ( requestedPage.startsWith("/admin") && !validRoles.includes(session.user.rol)) 
    return NextResponse.redirect(new URL("/", req.url));
  
    if ( requestedPage.startsWith("/api/admin") && !validRoles.includes(session.user.rol)) 
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    // return NextResponse.redirect( new URL(), req.url )
    return NextResponse.next();

}

export const config = {
    matcher: [
      '/checkout/:path*',
      '/orders/:path*',
      '/api/orders/:path*',
      '/admin/:path*',
      '/api/admin/:path*'
    ],
  };