import { Box } from "@mui/material"
import Head from "next/head"


export const AuthLayout = ({ children, titulo }) => {
  return (
    <>
      <Head>
        <title>{ titulo }</title>
      </Head>

      <main>
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh - 200px)'}>
          {children}
        </Box>
      </main>
    </>
  )
}
