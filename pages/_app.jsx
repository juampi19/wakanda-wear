import { AuthProvider, CarritoProvider, UIProvider } from '@/context';
import '@/styles/globals.css'
import { lightTheme } from '@/themes'
import { CssBaseline, ThemeProvider } from '@mui/material';
import { SWRConfig } from "swr"

export default function App({ Component, pageProps }) {
  return (

    <SWRConfig 
      value={{
        // refreshInterval: 3000,
        fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
      }}
    >

      <AuthProvider>
        <CarritoProvider>

          <UIProvider>
            <ThemeProvider theme={ lightTheme }>
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>

          </UIProvider>
          
        </CarritoProvider>
      </AuthProvider> 
    </SWRConfig>

    
  )
}
