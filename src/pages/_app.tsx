import "@/styles/globals.css";
import { useGetTheme } from "@/styles/theme";
import type { AppProps } from "next/app";
import Head from "next/head";
import NextNProgress from 'nextjs-progressbar'
import 'animate.css';
import { QueryClient, QueryClientProvider } from 'react-query'
import { ThemeProvider } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { NextPageWithLayout } from "@/utils/helpers/getLayout";
import dayjs from "dayjs";
import localeData from 'dayjs/plugin/localeData'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

export const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, retryDelay: 1000 * 5 } },
})

dayjs.extend(localeData)
dayjs.extend(timezone)
dayjs.extend(utc)

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {

  const theme = useGetTheme()

  const getLayout = Component.getLayout ?? (page => page)

  const components = getLayout(<Component {...pageProps} />)

  return (
    <>


      <QueryClientProvider client={queryClient}>
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
            {components}
          </main>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  )
}
