import "@/styles/globals.css";
import { useGetTheme } from "@/styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from 'nextjs-progressbar'
import 'animate.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, retryDelay: 1000 * 5 } },
})


export default function App({ Component, pageProps }: AppProps) {

  const theme = useGetTheme()


  return (
    <>
      <Head>
        <title>Book App - Project UAS</title>
        <meta
          name="description"
          content="Book App Project UAS"
        />
        <meta name="keywords" content="Book App Project UAS" />
        <link rel="icon" href="/logo.png" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <NextNProgress color={theme.palette.primary.main} height={3} />
          <ToastContainer
            hideProgressBar
            position='top-center'
            autoClose={1700}
            pauseOnHover
            closeButton={false}

          // limit={5}
          />
          <main className="relative min-h-screen bg-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary opacity-15 rounded-full blur-3xl"></div>
            {/* <div className="absolute top-0 right-0 w-96 sm:d-none h-96 bg-primary opacity-10 rounded-full blur-3xl"></div> */}
            {/* <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary opacity-10 rounded-full blur-3xl"></div> */}
            <div className="absolute bottom-0 right-0 sm:d-none w-96 h-96 bg-primary opacity-15 rounded-full blur-3xl"></div>
            <Component {...pageProps} />
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
